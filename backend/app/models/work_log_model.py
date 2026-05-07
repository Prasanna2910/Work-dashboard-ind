from typing import TypedDict


class WorkEntryDocument(TypedDict):
    personWorkedWith: str
    taskDescription: str
    hoursSpent: float
    completed: bool


class WorkLogDocument(TypedDict):
    date: str
    totalOfficeHours: float
    entries: list[WorkEntryDocument]
