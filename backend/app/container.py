

from dataclasses import dataclass
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker
from app.cloudflare.client import R2Client


@dataclass
class Container:
    """Composition root - owns all singletons"""

    engine: AsyncEngine
    session_factory: async_sessionmaker
    r2_client: R2Client
    
    
        