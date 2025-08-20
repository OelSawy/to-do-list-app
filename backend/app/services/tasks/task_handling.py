import os
import jwt
from fastapi import Request
from dotenv import load_dotenv
from schemas.task import TaskCreate, TaskCreateResponse, TaskEdit, TaskEditResponse, TaskResponse, TaskListResponse
from models.task import Task
from models.user import User
from services.middleware.auth import is_token_valid

load_dotenv()
jwt_secret = os.environ.get("JWT_SECRET")
jwt_algorithm = os.environ.get("JWT_ALGORITHM")

def create_task(task_data: TaskCreate, request: Request) -> TaskCreateResponse:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")
    
    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    task = Task(
        title=task_data.title,
        description=task_data.description,
        dueDate=task_data.dueDate,
        status=task_data.status,
        label=task_data.label,
        user=user
    )

    task.save()

    user.tasks.append(task)
    user.save()

    return TaskCreateResponse(
        id=str(task.id),
        title=task.title,
        description=task.description,
        dueDate=task.dueDate,
        status=task.status,
        label=task.label,
        user=str(task.user.id)
    )

def edit_task(task_id: str, task_data: TaskEdit, request: Request) -> TaskEditResponse:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    task = Task.objects(id=task_id, user=user).first()
    if not task:
        raise ValueError("Task not found.")

    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.dueDate is not None:
        task.dueDate = task_data.dueDate
    if task_data.status is not None:
        task.status = task_data.status
    if task_data.label is not None:
        task.label = task_data.label

    task.save()

    return TaskEditResponse(
        title=task.title,
        description=task.description,
        dueDate=task.dueDate,
        status=task.status,
        label=task.label,
        user=str(task.user.id)
    )

def get_all_tasks(request: Request) -> TaskListResponse:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    tasks = user.tasks

    task_responses = []

    for task in tasks:
        task_responses.append(TaskResponse(
            title=task.title,
            description=task.description,
            dueDate=task.dueDate,
            status=task.status,
            label=task.label,
            user=str(task.user.id),
            id=str(task.id)
        ))

    return TaskListResponse(tasks=task_responses)

def get_task(task_id: str, request: Request) -> TaskResponse:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    task = Task.objects(id=task_id, user=user).first()
    if not task:
        raise ValueError("Task not found.")

    return TaskResponse(
        title=task.title,
        description=task.description,
        dueDate=task.dueDate,
        status=task.status,
        label=task.label,
        user=str(task.user.id),
        id=str(task.id)
    )

def toggle_task_status(task_id: str, request: Request) -> TaskResponse:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    task = Task.objects(id=task_id, user=user).first()
    if not task:
        raise ValueError("Task not found.")

    task.status = not task.status
    task.save()

    return TaskResponse(
        title=task.title,
        description=task.description,
        dueDate=task.dueDate,
        status=task.status,
        label=task.label,
        user=str(task.user.id),
        id=str(task.id)
    )

def delete_task(task_id: str, request: Request) -> None:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    task = Task.objects(id=task_id, user=user).first()
    if not task:
        raise ValueError("Task not found.")

    user.update(pull__tasks=task)
    task.delete()

def complete_all_tasks(request: Request) -> None:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    tasks = user.tasks
    for task in tasks:
        task.status = True
        task.save()

def delete_completed_tasks(request: Request) -> None:
    token = request.cookies.get("token")
    if not token:
        raise ValueError("Authentication token is missing.")
    if not is_token_valid(token):
        raise ValueError("Invalid authentication token.")

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])
    user_id = payload.get("id")

    user = User.objects(id=user_id).first()
    if not user:
        raise ValueError("User not found.")

    tasks = user.tasks
    for task in tasks:
        if task.status:
            user.update(pull__tasks=task)
            task.delete()
