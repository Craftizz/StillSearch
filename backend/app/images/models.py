

from datetime import datetime
from sqlalchemy import String, Text, Integer, DateTime, text
from sqlalchemy.orm import Mapped, mapped_column, deferred
from sqlalchemy.dialects.postgresql import UUID
from pgvector.sqlalchemy import Vector

from app.shared.database import Base


class ImageModel(Base):
    __tablename__ = "images"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP"),
        nullable=False,
    )