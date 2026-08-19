import Sidebar from "@/components/Sidebar";
import { PostForm } from "../../PostForm";
import { requireCurrentUser } from "@/lib/auth-server";
import { getPost } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  const currentUser = await requireCurrentUser(`/posts/${id}/edit`);
  const post = await getPost(postId);

  if (post.user_id !== currentUser.id) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <PostForm
          mode="edit"
          postId={post.id}
          initialTitle={post.title}
          initialContent={post.content}
        />
        <Sidebar />
      </div>
    </div>
  );
}
