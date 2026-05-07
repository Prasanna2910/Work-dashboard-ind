from datetime import date
from typing import Any


def serialize_work_log(document: dict[str, Any]) -> dict[str, Any]:
    value = {**document}
    value["id"] = str(value.pop("_id"))

    # Mongo stores date as string for predictable frontend formatting.
    raw_date = value.get("date")
    if isinstance(raw_date, str):
        value["date"] = date.fromisoformat(raw_date)

    return value
