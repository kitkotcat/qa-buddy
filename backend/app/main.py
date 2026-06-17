from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.bug_reports import router as bug_reports_router
from app.api.checklists import router as checklists_router
from app.api.test_cases import router as test_cases_router


app = FastAPI(
    title="QA Buddy API",
    description="Backend API for QA Buddy pet-project",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "QA Buddy backend is running",
    }


app.include_router(bug_reports_router)
app.include_router(test_cases_router)
app.include_router(checklists_router)
