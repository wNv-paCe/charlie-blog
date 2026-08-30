import PostDetail from "@/app/posts/[id]/PostDetail";
import Sidebar from "@/components/Sidebar";
import { getComments } from "@/lib/api/comments";
import { getPost } from "@/lib/api/posts";
import { getCurrentUser } from "@/lib/auth-server";
import { notFound } from "next/navigation";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

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

  const comments = await getComments(post.id);

  const isOwner = currentUser?.id === post.user_id;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <div className="flex h-full flex-col">
          <PostDetail post={post} isOwner={isOwner} />

          <section className="mt-8">
            <h2 className="mb-8 text-2xl font-bold">Comments</h2>
            {currentUser && (
              <div className="my-4">
                <CommentForm postId={post.id} />
              </div>
            )}
            <CommentList
              comments={comments}
              postId={post.id}
              postAuthorId={post.author.id}
              currentUser={currentUser}
            />
          </section>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
