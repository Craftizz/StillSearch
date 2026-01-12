from enum import Enum
from pathlib import Path
import structlog
import logging
import sys

LOG_DIR = Path("logs")
LOG_FILE = LOG_DIR / "app.json"


class Environment(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"


class LogLevel(str, Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class LogFormat(str, Enum):
    JSON = "json"
    CONSOLE = "console"


# Third-party loggers to suppress
SUPPRESSED_LOGGERS = {
    "uvicorn.access": LogLevel.WARNING,
    "httpx": LogLevel.WARNING,
    "botocore": LogLevel.WARNING,
    "boto3": LogLevel.WARNING,
}


def setup_structlog(
    environment: Environment = Environment.DEVELOPMENT,
    log_level: LogLevel = LogLevel.INFO,
    log_format: LogFormat | None = None,
) -> None:
    """Configure structured logging with both console and file output."""
    
    # Create logs directory
    LOG_DIR.mkdir(exist_ok=True)

    if log_format is None:
        log_format = (
            LogFormat.CONSOLE
            if environment == Environment.DEVELOPMENT
            else LogFormat.JSON
        )

    level = getattr(logging, log_level.value)

    # Setup both console and file handlers
    console_handler = logging.StreamHandler(sys.stdout)
    file_handler = logging.FileHandler(LOG_FILE)
    
    logging.basicConfig(
        format="%(message)s",
        level=level,
        handlers=[console_handler, file_handler],
        force=True,
    )

    # Configure shared processors
    shared_processors = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.CallsiteParameterAdder(
            parameters=[
                structlog.processors.CallsiteParameter.FILENAME,
                structlog.processors.CallsiteParameter.LINENO,
                structlog.processors.CallsiteParameter.FUNC_NAME,
            ]
        ),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
    ]

    # Console gets pretty output, file gets JSON
    console_handler.setFormatter(structlog.stdlib.ProcessorFormatter(
        processor=structlog.dev.ConsoleRenderer(),
        foreign_pre_chain=shared_processors,
    ))
    
    file_handler.setFormatter(structlog.stdlib.ProcessorFormatter(
        processor=structlog.processors.JSONRenderer(),
        foreign_pre_chain=shared_processors,
    ))

    # Use stdlib ProcessorFormatter
    processors = shared_processors + [
        structlog.stdlib.ProcessorFormatter.wrap_for_formatter,
    ]

    structlog.configure(
        processors=processors,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    # Suppress noisy third-party loggers
    for logger_name, suppress_level in SUPPRESSED_LOGGERS.items():
        logging.getLogger(logger_name).setLevel(getattr(logging, suppress_level.value))
