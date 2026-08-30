import { Comment } from "@/lib/types/post";
import CommentItem from "./CommentItem";
import { UserPublic } from "@/lib/types/user";

type CommentListProps = {
  comments: Comment[];
  postId: number;
  postAuthorId: number;
  currentUser: UserPublic | null;
};

export default function CommentList({
  comments,
  postId,
  postAuthorId,
  currentUser,
}: CommentListProps) {
  const rootComments = comments.filter((comment) => comment.parent_id === null);

  if (rootComments.length === 0) {
    return <p className="text-muted">No comments yet.</p>;
  }

  return (
    <div className="space-y-6">
      {rootComments.map((comment) => (
        <CommentItem
          key={comment.id}
          postId={postId}
          comment={comment}
          comments={comments}
          postAuthorId={postAuthorId}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
