import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";
import { getPosts } from "@/lib/api/posts";

const POSTS_PER_PAGE = 10;

type HomeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const skip = (page - 1) * POSTS_PER_PAGE;

  const data = await getPosts(skip, POSTS_PER_PAGE);
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <div className="flex h-full flex-col">
          <PostList posts={data.posts} />
          <div className="mt-auto">
            <Pagination
              currentPage={page}
              hasMore={data.has_more}
              basePath="/"
            />
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
