from app.cloudflare.client import R2Client, Bucket

class R2Service:

    def __init__(self, r2_client: R2Client):
        self.r2_client = r2_client

    async def upload_file(self, key: str, file: bytes, bucket: Bucket) -> None:
        """Upload raw bytes to the given R2 bucket"""
        self.r2_client.get_client().put_object(
            Bucket=bucket.value,
            Key=key,
            Body=file,
        )

    async def upload_files(self, key: str, files: dict[Bucket, bytes]) -> None:
        """Upload multiple files to their respective buckets in R2."""
        for bucket, file in files.items():
            self.r2_client.get_client().put_object(
                Bucket=bucket.value,
                Key=key,
                Body=file,
            )

    async def delete_file(self, key: str, bucket: Bucket) -> None:
        """Delete object identified by `key` from the specified `bucket`."""
        self.r2_client.get_client().delete_object(
            Bucket=bucket.value,
            Key=key,
        )

    async def delete_files(self, key: str) -> None:
        """Delete object identified by `key` from all buckets."""
        for bucket in Bucket:
            self.r2_client.get_client().delete_object(
                Bucket=bucket.value,
                Key=key,
            )
