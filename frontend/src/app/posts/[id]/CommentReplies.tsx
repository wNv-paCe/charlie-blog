"use client";

import { useState } from "react";
import { Comment } from "@/lib/types/post";
import { UserPublic } from "@/lib/types/user";
import CommentItem from "./CommentItem";

type CommentRepliesProps = {
  postId: number;
  replies: Comment[];
  comments: Comment[];
  postAuthorId: number;
  currentUser: UserPublic | null;
};

export default function CommentReplies({
  postId,
  replies,
  comments,
  postAuthorId,
  currentUser,
}: CommentRepliesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (replies.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer rounded-lg px-3 py-1 text-sm font-bold text-foreground hover:bg-hover"
      >
        {isExpanded
          ? "Hide replies ⌃"
          : `${replies.length} ${replies.length === 1 ? "reply" : "replies"} ⌄`}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-6">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              postId={postId}
              comment={reply}
              comments={comments}
              postAuthorId={postAuthorId}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
