from fastapi import APIRouter, status

from app.schemas.work_log import DeleteResponse, WorkLogCreate, WorkLogResponse, WorkLogUpdate
from app.services.work_log_service import WorkLogService

router = APIRouter()


@router.post("", response_model=WorkLogResponse, status_code=status.HTTP_201_CREATED)
async def create_work_log(payload: WorkLogCreate) -> WorkLogResponse:
    service = WorkLogService()
    work_log = await service.create_work_log(payload)
    return WorkLogResponse(**work_log)


@router.get("", response_model=list[WorkLogResponse])
async def get_all_work_logs() -> list[WorkLogResponse]:
    service = WorkLogService()
    work_logs = await service.get_all_work_logs()
    return [WorkLogResponse(**work_log) for work_log in work_logs]


@router.get("/{log_id}", response_model=WorkLogResponse)
async def get_work_log_by_id(log_id: str) -> WorkLogResponse:
    service = WorkLogService()
    work_log = await service.get_work_log_by_id(log_id)
    return WorkLogResponse(**work_log)


@router.put("/{log_id}", response_model=WorkLogResponse)
async def update_work_log(log_id: str, payload: WorkLogUpdate) -> WorkLogResponse:
    service = WorkLogService()
    work_log = await service.update_work_log(log_id, payload)
    return WorkLogResponse(**work_log)


@router.delete("/{log_id}", response_model=DeleteResponse)
async def delete_work_log(log_id: str) -> DeleteResponse:
    service = WorkLogService()
    await service.delete_work_log(log_id)
    return DeleteResponse(message="Work log deleted successfully.")
