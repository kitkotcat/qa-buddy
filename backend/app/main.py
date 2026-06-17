from fastapi import FastAPI

app = FastAPI(
    title="QA Buddy API",
    description="Backend API for QA Buddy pet-project",
    version="0.1.0",
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "QA Buddy backend is running"
    }