from typing import Literal
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str = "StillSearch API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: Literal["development", "staging", "production"] = "development"

    DATABASE_URL: str = ""
    DEBUG: bool = True

    # Load environment variables from a local .env file during development
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
        "extra": "ignore",
    }


settings = Settings()