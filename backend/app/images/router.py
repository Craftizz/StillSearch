from fastapi import APIRouter, Depends, File, UploadFile
from PIL import Image

from app.images.dependencies import get_image_service
from app.images.schemas import ImageUpload, ImageUploadResponse
from app.images.service import ImageService


ImageRouter = APIRouter(prefix="/v1/upload", tags=["upload"])


@ImageRouter.post("/", response_model=ImageUploadResponse)
async def upload_image(
    metadata: ImageUpload = Depends(),
    file: UploadFile = File(...),
    image_service: ImageService = Depends(get_image_service),
):
    """Endpoint to upload an image."""
    try:

        image = Image.open(file.file)
        await image_service.upload_image(image)

    except Exception as e:
        return ImageUploadResponse(
            code=500, 
            message=f"Failed to upload image: {e}"
    )

    return ImageUploadResponse(
        code=200, 
        message="Image uploaded successfully."
    )

