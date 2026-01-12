from dataclasses import dataclass
from tkinter import NO

import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.container import Container
from app.images.router import ImageRouter
from app.shared.database import create_db_engine, create_session_factory


from app.cloudflare.client import R2Client

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager for startup and shutdown events.
    Handles models initialization and cleanup.
    """
    engine = create_db_engine()
    session_factory = create_session_factory(engine)
    r2_client = R2Client()

    app.state.container = Container(
        engine=engine,
        session_factory=session_factory,
        r2_client=r2_client,
    )

    app.include_router(ImageRouter)
    yield

    if app.state.container.engine:
        await app.state.container.engine.dispose()


app = FastAPI(
    title="ML Model API",
    version="0.0.1",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "StillSearch",
        "version": "0.0.1",
        "environment": "Development",
        "documentation": "/docs",
        "endpoints": {
            "health": "/health",
            "upload": "/api/v1/upload",
        },
    }


def main():
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=9000,
        reload=True,
        log_level="debug",
    )


if __name__ == "__main__":
    main()
