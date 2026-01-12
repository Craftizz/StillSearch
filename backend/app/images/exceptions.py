class ImageServiceError(Exception):
    """Base exception for image service errors."""
    pass

class ImageValidationError(ImageServiceError):
    """Raised when image validation fails"""
    pass

class ImageProcessingError(ImageServiceError):
    """Raised when image processing fails"""
    pass

class ImageUploadError(ImageServiceError):
    """Raised when image upload fails"""
    pass

class ImageDatabaseError(ImageServiceError):
    """Raised when database operations fail"""
    pass

class ImageNotFoundError(ImageServiceError):
    """Raised when image is not found"""
    pass
