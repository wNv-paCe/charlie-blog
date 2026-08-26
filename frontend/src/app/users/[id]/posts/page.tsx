import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";
import { getUser } from "@/lib/api/users";
import { getUserPosts } from "@/lib/api/users";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 10;

type UserPostsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function UserPostsPage({
  params,
  searchParams,
}: UserPostsPageProps) {
  const { id } = await params;
  const { page: pageParam } = await searchParams;

  const userId = Number(id);
  const page = Math.max(1, Number(pageParam) || 1);
  const skip = (page - 1) * POSTS_PER_PAGE;

  const [user, data] = await Promise.all([
    getUser(userId),
    getUserPosts(userId, skip, POSTS_PER_PAGE),
  ]);

  if (!user || !data) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <div className="flex h-full flex-col">
          <PostList posts={data.posts} title={`Posts by ${user.username}`} />
          <div className="mt-auto">
            <Pagination
              currentPage={page}
              hasMore={data.has_more}
              basePath={`/users/${user.id}/posts`}
            />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
