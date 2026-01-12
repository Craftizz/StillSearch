import boto3
from botocore.client import Config
from enum import Enum
import logging

from app.cloudflare.config import r2_settings


logger = logging.getLogger(__name__)


class Bucket(str, Enum):
    ORIGINAL = "stillsearch-images-original"
    OPTIMIZED = "stillsearch-images-optimized"
    THUMBNAIL = "stillsearch-images-thumbnail"


class R2Client:
    
    def __init__(self):
        """Initialize the S3 client for Cloudflare R2"""

        self.client = boto3.client(
            's3',
            endpoint_url=f'https://{r2_settings.R2_ACCOUNT_ID}.r2.cloudflarestorage.com',
            aws_access_key_id=r2_settings.R2_ACCESS_KEY_ID,
            aws_secret_access_key=r2_settings.R2_SECRET_ACCESS_KEY,
            config=Config(signature_version='s3v4'),
            region_name='auto'
        )

    def get_client(self):
        return self.client
    
