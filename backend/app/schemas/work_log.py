from datetime import date

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class WorkEntryBase(BaseModel):
    personWorkedWith: str = Field(..., min_length=2, max_length=80)
    taskDescription: str = Field(..., min_length=3, max_length=500)
    hoursSpent: float = Field(..., gt=0, le=24)
    completed: bool = False


class WorkLogBase(BaseModel):
    date: date
    totalOfficeHours: float = Field(..., gt=0, le=24)
    entries: list[WorkEntryBase] = Field(..., min_length=1)

    @field_validator("entries")
    @classmethod
    def ensure_entries_hours_within_total(cls, entries: list[WorkEntryBase]) -> list[WorkEntryBase]:
        total_entry_hours = sum(entry.hoursSpent for entry in entries)
        if total_entry_hours <= 0:
            raise ValueError("At least one valid work entry with positive hours is required.")
        return entries

    @model_validator(mode="after")
    def ensure_total_hours_consistency(self) -> "WorkLogBase":
        entry_hours = sum(entry.hoursSpent for entry in self.entries)
        if entry_hours > self.totalOfficeHours:
            raise ValueError("Sum of entry hours cannot exceed total office hours.")
        return self


class WorkLogCreate(WorkLogBase):
    pass


class WorkLogUpdate(WorkLogBase):
    pass


class WorkEntryResponse(WorkEntryBase):
    pass


class WorkLogResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    date: date
    totalOfficeHours: float
    entries: list[WorkEntryResponse]


class DeleteResponse(BaseModel):
    message: str
