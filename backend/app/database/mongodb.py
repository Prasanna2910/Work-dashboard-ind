from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config.settings import get_settings


class MongoDB:
    client: AsyncIOMotorClient | None = None
    db: AsyncIOMotorDatabase | None = None


mongodb = MongoDB()


def get_database() -> AsyncIOMotorDatabase:
    if mongodb.db is None:
        raise RuntimeError("Database has not been initialized.")
    return mongodb.db


async def connect_to_mongo() -> None:
    settings = get_settings()
    mongodb.client = AsyncIOMotorClient(settings.mongo_uri)
    mongodb.db = mongodb.client[settings.mongo_db_name]
    await mongodb.db.work_logs.create_index("date", unique=True)


async def close_mongo_connection() -> None:
    if mongodb.client:
        mongodb.client.close()
        mongodb.client = None
        mongodb.db = None
