from fastapi import APIRouter, HTTPException, Response, Request
from schemas.task import TaskCreate, TaskCreateResponse, TaskEdit, TaskEditResponse, TaskResponse, TaskListResponse
from services.tasks.task_handling import create_task, edit_task, get_all_tasks, get_task, toggle_task_status, delete_task

router = APIRouter()

@router.post("/create", response_model=TaskCreateResponse)
def create(request: Request, task_data: TaskCreate):
    try:
        return create_task(task_data, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/edit/{task_id}", response_model=TaskEditResponse)
def edit(request: Request, task_id: str, task_data: TaskEdit):
    try:
        return edit_task(task_id, task_data, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("", response_model=TaskListResponse)
def get_all(request: Request):
    try:
        return get_all_tasks(request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{task_id}", response_model=TaskResponse)
def get(request: Request, task_id: str):
    try:
        return get_task(task_id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/toggle/{task_id}", response_model=TaskResponse)
def toggle(request: Request, task_id: str):
    try:
        return toggle_task_status(task_id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{task_id}")
def delete(request: Request, task_id: str):
    try:
        delete_task(task_id, request)
        return Response(status_code=204)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))