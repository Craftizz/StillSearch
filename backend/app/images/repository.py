import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.images.models import ImageModel


class ImageRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_image_by_id(self, image_id: uuid.UUID) -> ImageModel | None:
        """Retrieves an image record from the database by its ID"""
        image = await self.db.get(ImageModel, image_id)
        return image

    async def create_image_record(self, image: ImageModel) -> ImageModel:
        """Creates a new image record in the database"""
        self.db.add(image)
        
        await self.db.commit()
        await self.db.refresh(image)

        return image
    
    async def update_image_record(self, image_id: uuid.UUID) -> None:
        """Updates an image record in the database by its ID"""
        image = await self.db.get(ImageModel, image_id)
        if image:
            # Placeholder for actual update logic
            await self.db.commit()

    async def delete_image_record(self, image_id: uuid.UUID) -> None:
        """Deletes an image record from the database by its ID"""
        image = await self.db.get(ImageModel, image_id)
        if image:
            await self.db.delete(image)
            await self.db.commit()
