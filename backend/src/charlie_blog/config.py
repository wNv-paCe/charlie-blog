from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    # Database
    database_url: str
    database_direct_url: str | None = None

    # Security
    secret_key: SecretStr
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    reset_token_expire_minutes: int = 60
    cookie_secure: bool = False

    # App
    posts_per_page: int = 10
    frontend_url: str = "http://localhost:3000"

    # S3 Configuration
    s3_bucket_name: str
    s3_region: str = "auto"
    s3_access_key_id: SecretStr | None = None
    s3_secret_access_key: SecretStr | None = None
    s3_endpoint_url: str | None = None
    s3_public_url: str
    max_upload_size_bytes: int = 5 * 1024 * 1024

    # Email
    mail_server: str = "localhost"
    mail_port: int = 587
    mail_username: str = ""
    mail_password: SecretStr = SecretStr("")
    mail_from: str = "noreply@example.com"
    mail_use_tls: bool = True


settings = Settings()  # type: ignore
