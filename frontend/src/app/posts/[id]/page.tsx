import PostDetail from "@/app/posts/[id]/PostDetail";
import Sidebar from "@/components/Sidebar";
import { getPost } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth-server";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, currentUser] = await Promise.all([
    getPost(Number(id)),
    getCurrentUser(),
  ]);

  if (!post) {
    notFound();
  }

  const isOwner = currentUser?.id === post.user_id;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <PostDetail post={post} isOwner={isOwner} />
        <Sidebar />
      </div>
    </div>
  );
}
