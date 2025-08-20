from fastapi import FastAPI
from config.db import connect_db
from routes.user import router as user_router
from routes.task import router as task_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI();

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def init_db():
    connect_db()

app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(task_router, prefix="/tasks", tags=["Tasks"])