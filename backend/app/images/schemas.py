
from uuid import UUID
from pydantic import BaseModel


class ImageBase(BaseModel):
    """Base schema with common image attributes"""

    id: UUID
    user_id: UUID
    project_id: UUID | None = None


class ImageMetaData(BaseModel):
    """Schema for image metadata"""


class ImageUpload(BaseModel):
    """Schema for creating a new image"""
    id: UUID
    user_id: UUID
    project_id: UUID | None = None
    metadata: ImageMetaData | None = None


class ImageUploadResponse(BaseModel):
    """Schema for image upload response"""
    code: int
    message: str


class ImageUpdate(BaseModel):
    """Schema for updating image information"""
    metadata: ImageMetaData | None = None


class ImageUpdateResponse(BaseModel):
    """Schema for image update response"""
    code: int
    message: str


class ImageDelete(BaseModel):
    """Schema for deleting an image"""
    id: UUID


class ImageDeleteResponse(BaseModel):
    """Schema for image delete response"""
    code: int
    message: str


