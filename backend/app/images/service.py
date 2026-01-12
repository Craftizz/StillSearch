import uuid
import logging
from PIL.Image import Image

from app.images.exceptions import ImageUploadError
from app.images.repository import ImageRepository
from app.images.models import ImageModel
from app.cloudflare.service import R2Service
from app.cloudflare.client import BucketType
from app.images.utils import ImageProcessor

logger = logging.getLogger(__name__)

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

        # Create database file record
        await self.repository.create_image_record(
            ImageModel(
                id=image_id,
                user_id=uuid.uuid4()
            )
        )

        try:
            optimized_images = ImageProcessor.optimize_image(image)
            self.r2_service.upload_files(
                key=str(image_id),
                files={
                    BucketType.ORIGINAL: optimized_images["original"],
                    BucketType.OPTIMIZED: optimized_images["default"],
                    BucketType.THUMBNAIL: optimized_images["thumbnail"],
                },
            )
        except Exception as e:
            raise ImageUploadError("Failed to upload image") from e

        logger.info("Uploaded image with ID %s to R2", str(image_id))

