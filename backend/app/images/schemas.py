from uuid import UUID
from pydantic import BaseModel

class ImageBase(BaseModel):
    """Base schema with common image attributes"""
    id: UUID

class ImageCreate(BaseModel):
    """Schema for creating a new image"""
    user_id: UUID

    description: str | None = None

class ImageResponse(BaseModel):
    """Schema for image response"""
    created_at: str

class ImageUploadResponse(BaseModel):
    """Schema for image upload response"""
    code: int
    message: str

class ImageListResponse(BaseModel):
    """Schema for list of images response"""
    images: list[ImageResponse]





