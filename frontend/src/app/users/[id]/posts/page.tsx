import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";
import { getUser, getUserPosts } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function UserPostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);

  const [user, data] = await Promise.all([
    getUser(userId),
    getUserPosts(userId, 0, 10),
  ]);

  if (!user || !data) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <PostList posts={data.posts} title={`Posts by ${user.username}`} />
        <Sidebar />
      </div>
    </div>
  );
}
