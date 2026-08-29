"use client";

import { Comment } from "@/lib/types/post";
import { UserPublic } from "@/lib/types/user";
import Link from "next/link";
import CommentActions from "./CommentActions";
import { useState } from "react";
import CommentEditForm from "./CommentEditForm";

type CommentBodyProps = {
  comment: Comment;
  postAuthorId: number;
  currentUser: UserPublic | null;
};

export default function CommentBody({
  comment,
  postAuthorId,
  currentUser,
}: CommentBodyProps) {
  const [isEditing, setIsEditing] = useState(false);

  const isAuthor = comment.user?.id === postAuthorId;
  const isOwner = currentUser?.id === comment.user?.id;
  const isDeleted = comment.deleted_at !== null;

  return (
    <div className="min-w-0 flex-1">
      {!isEditing && (
        <>
          <div className="flex items-center gap-2 text-sm">
            {comment.user ? (
              <Link
                href={`/users/${comment.user.id}/posts`}
                className="font-semibold hover:text-blue-500"
              >
                {comment.user.username}
              </Link>
            ) : (
              <span className="font-semibold text-muted">Deleted user</span>
            )}

            {isAuthor && <span className="text-xs text-muted">Author</span>}

            <span className="text-muted">·</span>

            <span className="text-muted">
              {new Date(comment.created_at).toLocaleDateString("en-CA")}
            </span>

            {isOwner && !isDeleted && (
              <CommentActions
                comment={comment}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>

          <p
            className={
              isDeleted
                ? "mt-1 wrap-break-word text-muted italic"
                : "mt-1 wrap-break-word text-card-foreground"
            }
          >
            {comment.content}
          </p>
        </>
      )}
      {isEditing && (
        <CommentEditForm
          comment={comment}
          onCancel={() => setIsEditing(false)}
          onSaved={() => {
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}
