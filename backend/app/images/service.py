import uuid
from PIL.Image import Image
import structlog

from app.images.exceptions import ImageUploadError
from app.images.repository import ImageRepository
from app.images.models import ImageModel
from app.cloudflare.service import R2Service
from app.cloudflare.client import Bucket
from app.images.utils import ImageProcessor

logger = structlog.get_logger()


class ImageService:
    def __init__(
        self,
        repository: ImageRepository,
        r2_service: R2Service,
    ) -> None:
        self.repository = repository
        self.r2_service = r2_service

    async def upload_image(self, image: Image) -> None:
        """Optimizes and Uploads an image to the storage service."""

        image_id = uuid.uuid4()
        user_id = uuid.uuid4()  # Placeholder for actual user ID retrieval

        # Create database file record
        await self.repository.create_image_record(
            ImageModel(id=image_id, user_id=user_id)
        )

        try:
            optimized_images = ImageProcessor.optimize_image(image)
            await self.r2_service.upload_files(
                key=str(image_id),
                files={
                    Bucket.ORIGINAL: optimized_images["original"],
                    Bucket.OPTIMIZED: optimized_images["default"],
                    Bucket.THUMBNAIL: optimized_images["thumbnail"],
                },
            )

            logger.info(
                event="image_upload",
                image_id=str(image_id),
                user_id=str(user_id),
            )
            
        except Exception as e:
            raise ImageUploadError("Failed to upload image") from e

        logger.info(f"Uploaded image with ID {image_id} to R2")

    async def delete_image(self, image_id: uuid.UUID) -> None:
        """Deletes an image from the storage service and database."""

        await self.repository.delete_image_record(image_id=image_id)
        await self.r2_service.delete_files(key=str(image_id))

        logger.info(f"Deleted image with ID {image_id} from R2 and database")
