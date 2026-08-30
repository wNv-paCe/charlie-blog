import { Comment } from "@/lib/types/post";
import { UserPublic } from "@/lib/types/user";
import Image from "next/image";
import CommentBody from "./CommentBody";
import CommentReplies from "./CommentReplies";

type CommentItemProps = {
  postId: number;
  comment: Comment;
  comments: Comment[];
  postAuthorId: number;
  currentUser: UserPublic | null;
};

export default function CommentItem({
  postId,
  comment,
  comments,
  postAuthorId,
  currentUser,
}: CommentItemProps) {
  const replies = comments.filter((item) => item.parent_id === comment.id);

  return (
    <article key={comment.id} className="flex gap-3">
      {/* Avatar */}
      <div className="shrink-0">
        <Image
          src={comment.user?.image_path || "/default.jpg"}
          alt={comment.user?.username || "Deleted user"}
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>

      <div className="min-w-0 flex-1">
        <CommentBody
          postId={postId}
          comment={comment}
          postAuthorId={postAuthorId}
          currentUser={currentUser}
        />

        <CommentReplies
          replies={replies}
          postId={postId}
          comments={comments}
          postAuthorId={postAuthorId}
          currentUser={currentUser}
        />
      </div>
    </article>
  );
}
