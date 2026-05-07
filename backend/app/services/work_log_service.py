from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from app.database.mongodb import get_database
from app.schemas.work_log import WorkLogCreate, WorkLogUpdate
from app.utils.exceptions import ConflictException, NotFoundException
from app.utils.serializers import serialize_work_log


class WorkLogService:
    def __init__(self) -> None:
        self.collection = get_database().work_logs

    async def create_work_log(self, payload: WorkLogCreate) -> dict:
        data = payload.model_dump()
        data["date"] = payload.date.isoformat()

        try:
            result = await self.collection.insert_one(data)
        except DuplicateKeyError as error:
            raise ConflictException("A work log already exists for this date.") from error

        created = await self.collection.find_one({"_id": result.inserted_id})
        if not created:
            raise NotFoundException("Unable to fetch newly created work log.")

        return serialize_work_log(created)

    async def get_all_work_logs(self) -> list[dict]:
        cursor = self.collection.find().sort("date", 1)
        documents = await cursor.to_list(length=1000)
        return [serialize_work_log(doc) for doc in documents]

    async def get_work_log_by_id(self, log_id: str) -> dict:
        document = await self.collection.find_one({"_id": self._to_object_id(log_id)})
        if not document:
            raise NotFoundException("Work log not found.")
        return serialize_work_log(document)

    async def update_work_log(self, log_id: str, payload: WorkLogUpdate) -> dict:
        object_id = self._to_object_id(log_id)
        data = payload.model_dump()
        data["date"] = payload.date.isoformat()

        try:
            result = await self.collection.update_one({"_id": object_id}, {"$set": data})
        except DuplicateKeyError as error:
            raise ConflictException("A work log already exists for this date.") from error

        if result.matched_count == 0:
            raise NotFoundException("Work log not found.")

        updated = await self.collection.find_one({"_id": object_id})
        if not updated:
            raise NotFoundException("Unable to fetch updated work log.")

        return serialize_work_log(updated)

    async def delete_work_log(self, log_id: str) -> None:
        result = await self.collection.delete_one({"_id": self._to_object_id(log_id)})
        if result.deleted_count == 0:
            raise NotFoundException("Work log not found.")

    @staticmethod
    def _to_object_id(log_id: str) -> ObjectId:
        if not ObjectId.is_valid(log_id):
            raise NotFoundException("Invalid work log id.")
        return ObjectId(log_id)
