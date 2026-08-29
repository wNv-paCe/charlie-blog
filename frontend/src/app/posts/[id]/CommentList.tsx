import { Comment } from "@/lib/types/post";
import CommentItem from "./CommentItem";
import { UserPublic } from "@/lib/types/user";

type CommentListProps = {
  comments: Comment[];
  postAuthorId: number;
  currentUser: UserPublic | null;
};

export default function CommentList({
  comments,
  postAuthorId,
  currentUser,
}: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-muted">No comments yet.</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postAuthorId={postAuthorId}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
