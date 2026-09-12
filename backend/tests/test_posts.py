import pytest
from httpx import AsyncClient

from tests.conftest import create_test_post, create_test_user, login_user


@pytest.mark.anyio
async def test_get_posts_empty(client: AsyncClient):
    response = await client.get("/api/posts")

    assert response.status_code == 200
    data = response.json()
    assert data["posts"] == []
    assert data["total"] == 0
    assert data["has_more"] is False


@pytest.mark.anyio
async def test_get_post_not_found(client: AsyncClient):
    response = await client.get("/api/posts/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Post not found"


@pytest.mark.anyio
async def test_create_post_success(client: AsyncClient):
    user = await create_test_user(client)
    await login_user(client)

    response = await client.post(
        "/api/posts",
        json={
            "title": "My First Post",
            "content": "This is the content",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "My First Post"
    assert data["content"] == "This is the content"
    assert data["user_id"] == user["id"]
    assert "id" in data
    assert "date_posted" in data
    assert data["author"]["username"] == "testuser"


@pytest.mark.anyio
async def test_create_post_unauthorized(client: AsyncClient):
    response = await client.post(
        "/api/posts",
        json={
            "title": "Test Post",
            "content": "Test content",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Access token cookie missing"


@pytest.mark.anyio
async def test_update_post_success(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post_response = await create_test_post(client)
    post_id = post_response["id"]

    response = await client.patch(
        f"/api/posts/{post_id}",
        json={"title": "Updated Title"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["content"] == "Test content"


@pytest.mark.anyio
async def test_update_post_wrong_user(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post_response = await create_test_post(client)
    post_id = post_response["id"]

    await create_test_user(client, username="user2", email="user2@example.com")
    await login_user(client, email="user2@example.com")

    response = await client.patch(
        f"/api/posts/{post_id}",
        json={"title": "Hacked Title"},
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Not authorized to update this post"


@pytest.mark.anyio
async def test_get_posts_with_pagination(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    for i in range(5):
        response = await client.post(
            "/api/posts",
            json={
                "title": f"Post {i}",
                "content": f"Content for post {i}",
            },
        )
        assert response.status_code == 201

    response = await client.get("/api/posts")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 5
    assert len(data["posts"]) == 5
    assert data["has_more"] is False

    response = await client.get("/api/posts?limit=2")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 5
    assert len(data["posts"]) == 2
    assert data["has_more"] is True

    response = await client.get("/api/posts?skip=2&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 5
    assert len(data["posts"]) == 2
    assert data["skip"] == 2
    assert data["limit"] == 2
    assert data["has_more"] is True


@pytest.mark.anyio
async def test_delete_post(client: AsyncClient):
    await create_test_user(client)
    await login_user(client)

    post_response = await create_test_post(client)
    post_id = post_response["id"]

    response = await client.delete(f"/api/posts/{post_id}")
    assert response.status_code == 204

    response = await client.get("/api/posts")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
