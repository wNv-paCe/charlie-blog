import pytest
from httpx import AsyncClient

from tests.conftest import create_test_post, create_test_user, log_out, login_user


@pytest.mark.anyio
async def test_create_comment_success(client: AsyncClient):
    user = await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Test comment",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert "created_at" in data
    assert data["deleted_at"] is None
    assert data["parent_id"] is None
    assert data["content"] == "Test comment"
    assert data["user"]["id"] == user["id"]


@pytest.mark.anyio
async def test_create_comment_unauthorized(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    await log_out(client)

    response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Hacked comment",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid or expired token"


@pytest.mark.anyio
async def test_get_comments_empty(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    await log_out(client)

    response = await client.get(f"/api/posts/{post_id}/comments")
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.anyio
async def test_get_comments_with_replies(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    comment_response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={"content": "Comment 1"},
    )
    assert comment_response.status_code == 201
    data = comment_response.json()
    assert data["parent_id"] is None
    comment_id = data["id"]

    reply_response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Reply comment 1",
            "parent_id": comment_id,
        },
    )
    assert reply_response.status_code == 201
    reply_id = reply_response.json()["id"]

    response = await client.get(
        f"/api/posts/{post_id}/comments",
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    reply = next(comment for comment in data if comment["id"] == reply_id)
    assert reply["parent_id"] == comment_id


@pytest.mark.anyio
async def test_update_comment_success(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    comment_response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Test comment",
        },
    )
    assert comment_response.status_code == 201
    comment_id = comment_response.json()["id"]

    response = await client.patch(
        f"/api/comments/{comment_id}",
        json={
            "content": "Updated comment",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == comment_id
    assert data["content"] == "Updated comment"


@pytest.mark.anyio
async def test_update_comment_wrong_user(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    comment_response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Test comment",
        },
    )
    assert comment_response.status_code == 201
    comment_id = comment_response.json()["id"]

    await log_out(client)

    await create_test_user(
        client,
        username="user2",
        email="user2@example.com",
        password="user2password",
    )

    await login_user(
        client,
        email="user2@example.com",
        password="user2password",
    )

    response = await client.patch(
        f"/api/comments/{comment_id}",
        json={
            "content": "Hacked comment",
        },
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "Not authorized to update this comment"


@pytest.mark.anyio
async def test_delete_comment_success(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    comment_response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Test comment",
        },
    )
    assert comment_response.status_code == 201
    data = comment_response.json()
    assert data["deleted_at"] is None
    comment_id = data["id"]

    response = await client.delete(
        f"/api/comments/{comment_id}",
    )
    assert response.status_code == 204

    response = await client.get(
        f"/api/posts/{post_id}/comments",
    )
    assert response.status_code == 200
    data = response.json()
    deleted_comment = next(comment for comment in data if comment["id"] == comment_id)
    assert deleted_comment["deleted_at"] is not None


@pytest.mark.anyio
async def test_delete_comment_wrong_user(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post = await create_test_post(client)
    post_id = post["id"]

    comment_response = await client.post(
        f"/api/posts/{post_id}/comments",
        json={
            "content": "Test comment",
        },
    )
    assert comment_response.status_code == 201
    comment_id = comment_response.json()["id"]

    await log_out(client)

    await create_test_user(
        client,
        username="user2",
        email="user2@example.com",
        password="user2password",
    )

    await login_user(
        client,
        email="user2@example.com",
        password="user2password",
    )

    response = await client.delete(
        f"/api/comments/{comment_id}",
    )
    assert response.status_code == 403
    assert response.json()["detail"] == "Not authorized to delete this comment"
