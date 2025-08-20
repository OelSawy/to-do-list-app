from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: str
    dueDate: datetime
    status: bool = False
    label: Optional[str] = None

class TaskCreateResponse(BaseModel):
    id: str
    title: str
    description: str
    dueDate: datetime
    status: bool
    label: Optional[str] = None
    user: str

    class Config:
        from_attributes = True

class TaskEdit(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    dueDate: Optional[datetime] = None
    status: Optional[bool] = None
    label: Optional[str] = None

class TaskEditResponse(BaseModel):
    title: str
    description: str
    dueDate: datetime
    status: bool
    label: str
    user: str

    class Config:
        from_attributes = True

class TaskResponse(BaseModel):
    title: str
    description: str
    dueDate: datetime
    status: bool = False
    label: Optional[str] = None
    user: str
    id: str

    class Config:
        from_attributes = True

class TaskListResponse(BaseModel):
    tasks: list[TaskResponse]

    class Config:
        from_attributes = True