from typing import BinaryIO, TypedDict
from PIL.Image import Image, Resampling
from io import BytesIO
from .config import ImageConfig

ALLOWED_IMAGE_FORMATS = getattr(
    ImageConfig, "ALLOWED_IMAGE_FORMATS", ["JPEG", "PNG", "WEBP"]
)
MAXIMUM_IMAGE_RESOLUTION = getattr(ImageConfig, "MAXIMUM_IMAGE_RESOLUTION", 2160)
DEFAULT_IMAGE_RESOLUTION = getattr(ImageConfig, "DEFAULT_IMAGE_RESOLUTION", 1080)
THUMBNAIL_SIZE = getattr(ImageConfig, "THUMBNAIL_SIZE", 720)


class OptimizedImages(TypedDict):
    original: bytes
    default: bytes
    thumbnail: bytes


class ImageValidator:
    
    @staticmethod
    def validate_file_size(file: BinaryIO, max_size: int) -> bool:
        """Validates that the file size does not exceed max_size in bytes."""
        file.seek(0, 2)
        size = file.tell()
        file.seek(0)
        return size <= max_size


class ImageProcessor:

    @staticmethod
    def optimize_image(image: Image) -> OptimizedImages:
        """Creates different resolutions of the given image and returns them as bytes."""

        # Convert image to RGB if it's in a different mode
        if image.mode in ("RGBA", "LA", "P"):
            image = image.convert("RGB")

        image_default = image.copy()
        image_thumbnail = image.copy()

        image_default.thumbnail(
            (DEFAULT_IMAGE_RESOLUTION, DEFAULT_IMAGE_RESOLUTION), Resampling.LANCZOS
        )
        image_thumbnail.thumbnail((THUMBNAIL_SIZE, THUMBNAIL_SIZE), Resampling.LANCZOS)

        if max(image.size) > MAXIMUM_IMAGE_RESOLUTION:
            image.thumbnail(
                (MAXIMUM_IMAGE_RESOLUTION, MAXIMUM_IMAGE_RESOLUTION), Resampling.LANCZOS
            )

        return {
            "original": to_bytes(image),
            "default": to_bytes(image_default),
            "thumbnail": to_bytes(image_thumbnail),
        }


def to_bytes(image: Image) -> bytes:
    """Converts a PIL Image to bytes."""

    buffer = BytesIO()
    image.save(buffer, format="JPEG", optimize=True)

    return buffer.getvalue()
