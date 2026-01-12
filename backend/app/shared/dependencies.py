from collections.abc import AsyncGenerator
from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.container import Container

async def get_db(request: Request) -> AsyncGenerator[AsyncSession, None]:
    """Get a database session from app state."""
    session_factory = request.app.state.container.session_factory
    async with session_factory() as session:
        try:
            yield session
        finally:
            await session.close()

def get_container(request: Request) -> Container:
    """Get the container from app state."""
    return request.app.state.container
