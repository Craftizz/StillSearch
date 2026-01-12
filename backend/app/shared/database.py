from collections.abc import AsyncGenerator

from fastapi import Request
from .config import settings

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

def create_db_engine():
    """Factory function to create database engine."""
    return create_async_engine(
        settings.DATABASE_URL,
        echo=settings.DEBUG,
        pool_pre_ping=True,
        pool_recycle=300,
    )

def create_session_factory(engine):
    """Factory function to create session factory."""
    return async_sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )




# engine = create_async_engine(
#     settings.DATABASE_URL,
#     echo=settings.DEBUG,
#     pool_pre_ping=True,
#     pool_recycle=300,
# )

# async_session_factory = async_sessionmaker(
#     engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
# )

# async def get_db() -> AsyncGenerator[AsyncSession, None]:
#     async with async_session_factory() as session:
#         try:
#             yield session
#         finally:
#             await session.close()




# import psycopg
# from psycopg_pool import ConnectionPool
# from contextlib import contextmanager
# from typing import Iterator

# _pool: ConnectionPool | None = None

# def create_pool(connection_string: str, 
#                min_size: int = 2, 
#                max_size: int = 10) -> None:
#     """Initializes the database connection pool."""

#     global _pool
#     _pool = ConnectionPool(
#         connection_string, min_size=min_size, max_size=max_size, open=True
#     )
    
# def close_pool() -> None:
#     """Closes the database connection pool."""

#     global _pool
#     if _pool is not None:
#         _pool.close()
#         _pool = None

# @contextmanager
# def get_db() -> Iterator[psycopg.Connection]:
#     """
#     Context manager to get a database connection from the pool.
#     Automatically handles connection return and rollback on errors.
    
#     Usage:
#         with get_db() as conn:
#             with conn.cursor() as cur:
#                 cur.execute("SELECT * FROM table")
#     """
#     global _pool
#     if _pool is None:
#         raise RuntimeError("Database connection pool is not initialized.")

#     with _pool.connection() as conn:
#         try:
#             yield conn
#             conn.commit()
#         except Exception:
#             conn.rollback()
#             raise