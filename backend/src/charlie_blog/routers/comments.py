from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

import charlie_blog.models as models
from charlie_blog.auth import CurrentUser
from charlie_blog.database import get_db
from charlie_blog.schemas import CommentCreate, CommentResponse, CommentUpdate

router = APIRouter()


@router.get("/posts/{post_id}/comments", response_model=list[CommentResponse])
async def get_comments(
    post_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(select(models.Post).where(models.Post.id == post_id))
    post = result.scalars().first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )

    result = await db.execute(
        select(models.Comment)
        .options(selectinload(models.Comment.user))
        .where(models.Comment.post_id == post_id)
        .order_by(models.Comment.created_at)
    )
    comments = result.scalars().all()

    return comments


@router.post(
    "/posts/{post_id}/comments",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_comment(
    post_id: int,
    comment: CommentCreate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(select(models.Post).where(models.Post.id == post_id))
    post = result.scalars().first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )

    new_comment = models.Comment(
        content=comment.content,
        user=current_user,
        post=post,
    )

    db.add(new_comment)
    await db.commit()
    await db.refresh(new_comment, attribute_names=["user"])

    return new_comment


@router.patch("/comments/{comment_id}", response_model=CommentResponse)
async def update_comment(
    comment_id: int,
    comment_data: CommentUpdate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(
        select(models.Comment).where(models.Comment.id == comment_id)
    )
    comment = result.scalars().first()

    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )

    if comment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this comment",
        )

    if comment_data.content is not None:
        comment.content = comment_data.content

    await db.commit()
    await db.refresh(comment, attribute_names=["user"])

    return comment
