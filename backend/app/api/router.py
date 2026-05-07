from fastapi import APIRouter

from app.api.v1.work_logs import router as work_logs_router

api_router = APIRouter()
api_router.include_router(work_logs_router, prefix="/work-logs", tags=["work-logs"])
