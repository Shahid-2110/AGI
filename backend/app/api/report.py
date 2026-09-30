from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.app.models.db import get_db, CropReport, Village
from backend.app.models.schemas import CropReportCreate, CropReportOut

router = APIRouter(prefix="/api/reports", tags=["Crowd-sourced Sighting Reports"])

@router.post("/", response_model=CropReportOut)
async def submit_sighting_report(
    report: CropReportCreate,
    db: Session = Depends(get_db)
):
    village = db.query(Village).filter(Village.id == report.village_id).first()
    if not village:
        raise HTTPException(status_code=404, detail="Invalid village ID")

    new_report = CropReport(
        village_id=report.village_id,
        farmer_name=report.farmer_name or "Kisan Mitra",
        crop_type=report.crop_type,
        disease_id=report.disease_id,
        disease_name=report.disease_name,
        severity=report.severity or "Medium",
        confidence=report.confidence or 0.85,
        image_url=report.image_url
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

@router.get("/recent", response_model=List[CropReportOut])
async def get_recent_reports(
    village_id: str = None,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(CropReport)
    if village_id:
        query = query.filter(CropReport.village_id == village_id)
    return query.order_by(CropReport.created_at.desc()).limit(limit).all()

@router.get("/villages")
async def get_village_list(db: Session = Depends(get_db)):
    return db.query(Village).all()
