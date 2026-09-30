from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.models.db import init_db
from backend.app.api.diagnose import router as diagnose_router
from backend.app.api.risk import router as risk_router
from backend.app.api.advisory import router as advisory_router
from backend.app.api.report import router as report_router

# Initialize database schema and seeds
init_db()

app = FastAPI(
    title="KhetRakshak (Field Guardian) API",
    description="AI-powered Crop Disease Diagnosis, Village Outbreak Risk Engine & Safe ICAR Advisory System",
    version="1.0.0"
)

# Enable CORS for Frontend PWA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(diagnose_router)
app.include_router(risk_router)
app.include_router(advisory_router)
app.include_router(report_router)

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "KhetRakshak Backend Gateway",
        "system_status": "Operational",
        "modules": [
            "Vision Classifier (MobileNet/PlantVillage)",
            "Explainable Village Risk Engine (Traffic-Light)",
            "Vetted Safe ICAR Advisory Knowledge Base",
            "Multilingual & Speech Accessibility Gateway"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
