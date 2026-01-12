from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.cloudflare.service import R2Service
from app.container import Container
from app.images.repository import ImageRepository
from app.images.service import ImageService
from app.shared.dependencies import get_container, get_db

def get_image_service(
    container: Container = Depends(get_container),
    db: AsyncSession = Depends(get_db),
) -> ImageService:
    """Factory that uses container to build the service."""
    return ImageService(
        repository=ImageRepository(db),
        r2_service=R2Service(container.r2_client),
    )