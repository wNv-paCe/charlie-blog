import os
from collections.abc import AsyncGenerator

os.environ["DATABASE_URL"] = (
    "postgresql+psycopg://bloguser:blogpass@localhost/test_blog"
)
os.environ["S3_BUCKET_NAME"] = "test-bucket"
os.environ["SECRET_KEY"] = "test-secret-key-testing-only-32bytes"

os.environ["S3_ACCESS_KEY_ID"] = "testing"
os.environ["S3_SECRET_ACCESS_KEY"] = "testing"
os.environ["S3_REGION"] = "us-east-1"
os.environ["S3_ENDPOINT_URL"] = ""
os.environ["S3_PUBLIC_URL"] = "https://test"

os.environ["AWS_ACCESS_KEY_ID"] = "testing"
os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"
os.environ["AWS_ENDPOINT_URL"] = ""

from unittest.mock import AsyncMock, patch

import boto3
import pytest
from alembic.config import Config
from httpx import ASGITransport, AsyncClient
from moto import mock_aws
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool

from alembic import command
from charlie_blog.database import get_db
from charlie_blog.main import app

pytest_plugins = ["anyio"]


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"


@pytest.fixture(scope="session")
async def test_engine():
    engine = create_async_engine(
        os.environ["DATABASE_URL"],
        poolclass=NullPool,
    )
    yield engine

    await engine.dispose()


@pytest.fixture(scope="session")
def setup_database():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")

    yield


@pytest.fixture
async def db_session(
    test_engine,
    setup_database,
) -> AsyncGenerator[AsyncSession]:
    conn = await test_engine.connect()
    trans = await conn.begin()

    test_async_session = async_sessionmaker(
        bind=conn,
        class_=AsyncSession,
        expire_on_commit=False,
        join_transaction_mode="create_savepoint",
    )

    async with test_async_session() as session:
        try:
            yield session
        finally:
            await session.close()
            await trans.rollback()
            await conn.close()


@pytest.fixture
def mocked_aws():
    with mock_aws():
        s3 = boto3.client("s3", region_name="us-east-1")
        s3.create_bucket(Bucket=os.environ["S3_BUCKET_NAME"])
        yield s3


@pytest.fixture
async def client(
    db_session: AsyncSession,
    mocked_aws,
) -> AsyncGenerator[AsyncClient]:
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac

    app.dependency_overrides.clear()


async def create_test_user(
    client: AsyncClient,
    username: str = "testuser",
    email: str = "test@example.com",
    password: str = "testpassword123",
) -> dict:
    response = await client.post(
        "/api/users",
        json={
            "username": username,
            "email": email,
            "password": password,
        },
    )
    assert response.status_code == 201, f"Failed to create user: {response.text}"
    return response.json()


async def login_user(
    client: AsyncClient,
    email: str = "test@example.com",
    password: str = "testpassword123",
):
    return await client.post(
        "/api/auth/login",
        data={
            "username": email,
            "password": password,
        },
    )


async def request_password_reset(
    client: AsyncClient, email: str = "test@example.com"
) -> str:
    with patch(
        "charlie_blog.routers.auth.send_password_reset_email",
        new_callable=AsyncMock,
    ) as mock_send:
        response = await client.post(
            "/api/auth/forgot-password",
            json={"email": email},
        )

        assert response.status_code == 202

        call_kwargs = mock_send.call_args.kwargs
        return call_kwargs["token"]


async def log_out(client: AsyncClient):
    response = await client.post("/api/auth/logout")
    assert response.status_code == 200


async def create_test_post(
    client: AsyncClient,
    title: str = "Test Title",
    content: str = "Test content",
) -> dict:
    response = await client.post(
        "/api/posts",
        json={
            "title": title,
            "content": content,
        },
    )
    assert response.status_code == 201, f"Failed to create post: {response.text}"
    return response.json()
