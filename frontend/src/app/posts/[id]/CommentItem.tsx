import { Comment } from "@/lib/types/post";
import { UserPublic } from "@/lib/types/user";
import Image from "next/image";
import CommentBody from "./CommentBody";

type CommentItemProps = {
  comment: Comment;
  postAuthorId: number;
  currentUser: UserPublic | null;
};

export default function CommentItem({
  comment,
  postAuthorId,
  currentUser,
}: CommentItemProps) {
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

      <CommentBody
        comment={comment}
        postAuthorId={postAuthorId}
        currentUser={currentUser}
      />
    </article>
  );
}
