from pydantic_settings import BaseSettings

class ImageConfig(BaseSettings):
    ALLOWED_IMAGE_FORMATS: list[str] = ["JPEG", "PNG", "WEBP"]
    MAXIMUM_IMAGE_RESOLUTION: int = 2160
    DEFAULT_IMAGE_RESOLUTION: int = 1080
    THUMBNAIL_SIZE: int = 720
    
    