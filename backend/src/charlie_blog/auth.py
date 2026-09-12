import hashlib
import secrets
from datetime import UTC, datetime, timedelta
from typing import Annotated

import jwt
from fastapi import Cookie, Depends, HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

import charlie_blog.models as models
from charlie_blog.config import settings
from charlie_blog.database import get_db

password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def generate_reset_token() -> str:
    return secrets.token_urlsafe(32)


def hash_reset_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(
            minutes=settings.access_token_expire_minutes,
        )
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(
        to_encode,
        settings.secret_key.get_secret_value(),
        algorithm=settings.algorithm,
    )
    return encode_jwt


def verify_access_token(token: str) -> tuple[str, int] | None:
    """Verify a JWT access token and return the subject (user id) if valid"""
    try:
        payload = jwt.decode(
            token,
            settings.secret_key.get_secret_value(),
            algorithms=[settings.algorithm],
            options={"require": ["exp", "sub", "token_version"]},
        )
    except jwt.ExpiredSignatureError:
        print("JWT error: token expired")
        return None
    except jwt.MissingRequiredClaimError as error:
        print("JWT error: missing claim:", error)
        return None
    except jwt.InvalidSignatureError:
        print("JWT error: invalid signature")
        return None
    except jwt.InvalidTokenError as error:
        print("JWT error:", repr(error))
        return None
    else:
        return payload["sub"], payload["token_version"]


async def get_access_token(
    access_token: Annotated[str | None, Cookie()] = None,
) -> str:
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token cookie missing",
        )
    return access_token


async def get_current_user(
    token: Annotated[str, Depends(get_access_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> models.User:
    token_data = verify_access_token(token)
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token verification failed",
        )

    user_id, token_version = token_data

    try:
        user_id_int = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    result = await db.execute(
        select(models.User).where(models.User.id == user_id_int),
    )
    user = result.scalars().first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if token_version != user.token_version:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return user


CurrentUser = Annotated[models.User, Depends(get_current_user)]
