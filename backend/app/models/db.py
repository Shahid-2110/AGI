import os
import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./khetrakshak.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Village(Base):
    __tablename__ = "villages"

    id = Column(String(50), primary_key=True, index=True) # e.g. "VIL-001"
    name = Column(String(100), nullable=False)
    state = Column(String(50), nullable=False)
    district = Column(String(50), nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    primary_crops = Column(String(200), default="Tomato, Rice, Potato, Cotton, Wheat")
    farmer_count = Column(Integer, default=450)
    kvk_center = Column(String(150), default="District Krishi Vigyan Kendra")
    kvk_contact = Column(String(50), default="1800-180-1551")

    reports = relationship("CropReport", back_populates="village")

class CropReport(Base):
    __tablename__ = "crop_reports"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    village_id = Column(String(50), ForeignKey("villages.id"), nullable=False)
    farmer_name = Column(String(100), default="Kisan Mitra")
    crop_type = Column(String(50), nullable=False)
    disease_id = Column(String(100), nullable=False)
    disease_name = Column(String(150), nullable=False)
    severity = Column(String(20), default="Medium") # Low, Medium, High
    confidence = Column(Float, default=0.85)
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    village = relationship("Village", back_populates="reports")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Seed villages if empty
        if db.query(Village).count() == 0:
            sample_villages = [
                Village(
                    id="VIL-RAMPUR",
                    name="Rampur (रामपुर)",
                    state="Uttar Pradesh",
                    district="Varanasi",
                    lat=25.3176,
                    lon=82.9739,
                    primary_crops="Tomato, Potato, Wheat, Rice",
                    farmer_count=620,
                    kvk_center="KVK Kashi Vidyapith, Varanasi",
                    kvk_contact="0542-2635412 / 1800-180-1551"
                ),
                Village(
                    id="VIL-KOTHAPALLI",
                    name="Kothapalli (కొత్తపల్లి)",
                    state="Telangana",
                    district="Ranga Reddy",
                    lat=17.2403,
                    lon=78.4294,
                    primary_crops="Cotton, Rice, Maize, Chili",
                    farmer_count=480,
                    kvk_center="KVK CRIDA, Hyderabad",
                    kvk_contact="040-24530177 / 1800-180-1551"
                ),
                Village(
                    id="VIL-MANDYA",
                    name="Chikka Mandya (ಚಿಕ್ಕ ಮಂಡ್ಯ)",
                    state="Karnataka",
                    district="Mandya",
                    lat=12.5218,
                    lon=76.8951,
                    primary_crops="Rice, Sugarcane, Tomato, Ragi",
                    farmer_count=540,
                    kvk_center="KVK V.C. Farm, Mandya",
                    kvk_contact="08232-277432 / 1800-180-1551"
                ),
                Village(
                    id="VIL-SHINDEWADI",
                    name="Shindewadi (शिंदेवाडी)",
                    state="Maharashtra",
                    district="Pune",
                    lat=18.4088,
                    lon=73.8567,
                    primary_crops="Tomato, Onion, Soybean, Sugarcane",
                    farmer_count=390,
                    kvk_center="KVK Baramati, Pune",
                    kvk_contact="02112-255207 / 1800-180-1551"
                ),
                Village(
                    id="VIL-BATHINDA",
                    name="Bhagta Bhaika (ਭਗਤਾ ਭਾਈ ਕਾ)",
                    state="Punjab",
                    district="Bathinda",
                    lat=30.3800,
                    lon=75.1200,
                    primary_crops="Wheat, Cotton, Rice, Mustard",
                    farmer_count=710,
                    kvk_center="PAU KVK Bathinda",
                    kvk_contact="0164-2212159 / 1800-180-1551"
                ),
                Village(
                    id="VIL-SIRSA",
                    name="Ding Mandi (डिंग मंडी)",
                    state="Haryana",
                    district="Sirsa",
                    lat=29.4500,
                    lon=75.2100,
                    primary_crops="Cotton, Wheat, Mustard, Guar",
                    farmer_count=530,
                    kvk_center="CCS HAU KVK Sirsa",
                    kvk_contact="01666-238411 / 1800-180-1551"
                )
            ]
            db.add_all(sample_villages)
            db.commit()

            # Seed realistic recent crop reports
            now = datetime.datetime.utcnow()
            sample_reports = [
                # Rampur: High tomato early blight outbreak
                CropReport(village_id="VIL-RAMPUR", farmer_name="Ramesh Yadav", crop_type="Tomato", disease_id="tomato_early_blight", disease_name="Tomato Early Blight", severity="High", confidence=0.92, created_at=now - datetime.timedelta(hours=3)),
                CropReport(village_id="VIL-RAMPUR", farmer_name="Sita Devi", crop_type="Tomato", disease_id="tomato_early_blight", disease_name="Tomato Early Blight", severity="High", confidence=0.88, created_at=now - datetime.timedelta(hours=7)),
                CropReport(village_id="VIL-RAMPUR", farmer_name="Mukesh Maurya", crop_type="Tomato", disease_id="tomato_early_blight", disease_name="Tomato Early Blight", severity="Medium", confidence=0.91, created_at=now - datetime.timedelta(hours=14)),
                CropReport(village_id="VIL-RAMPUR", farmer_name="Kallu Singh", crop_type="Potato", disease_id="potato_late_blight", disease_name="Potato Late Blight", severity="High", confidence=0.85, created_at=now - datetime.timedelta(days=1)),
                CropReport(village_id="VIL-RAMPUR", farmer_name="Sunil Verma", crop_type="Tomato", disease_id="tomato_early_blight", disease_name="Tomato Early Blight", severity="High", confidence=0.94, created_at=now - datetime.timedelta(days=2)),

                # Kothapalli: Cotton leaf curl & Rice blast
                CropReport(village_id="VIL-KOTHAPALLI", farmer_name="Anjaneyulu Reddy", crop_type="Cotton", disease_id="cotton_leaf_curl", disease_name="Cotton Leaf Curl Virus", severity="Medium", confidence=0.89, created_at=now - datetime.timedelta(hours=5)),
                CropReport(village_id="VIL-KOTHAPALLI", farmer_name="Laxmamma", crop_type="Rice", disease_id="rice_blast", disease_name="Rice Blast (Magnaporthe)", severity="Medium", confidence=0.87, created_at=now - datetime.timedelta(days=1)),
                CropReport(village_id="VIL-KOTHAPALLI", farmer_name="Venkat Rao", crop_type="Cotton", disease_id="cotton_leaf_curl", disease_name="Cotton Leaf Curl Virus", severity="Low", confidence=0.82, created_at=now - datetime.timedelta(days=2)),

                # Shindewadi: Tomato bacterial spot
                CropReport(village_id="VIL-SHINDEWADI", farmer_name="Dattatray Patil", crop_type="Tomato", disease_id="tomato_bacterial_spot", disease_name="Tomato Bacterial Spot", severity="Low", confidence=0.84, created_at=now - datetime.timedelta(hours=8)),
                CropReport(village_id="VIL-SHINDEWADI", farmer_name="Vitthal Shinde", crop_type="Tomato", disease_id="tomato_bacterial_spot", disease_name="Tomato Bacterial Spot", severity="Low", confidence=0.79, created_at=now - datetime.timedelta(days=3)),

                # Mandya: Rice blast
                CropReport(village_id="VIL-MANDYA", farmer_name="Basavaraj Gowda", crop_type="Rice", disease_id="rice_blast", disease_name="Rice Blast", severity="Medium", confidence=0.90, created_at=now - datetime.timedelta(hours=10)),
                CropReport(village_id="VIL-MANDYA", farmer_name="Shivanna", crop_type="Rice", disease_id="rice_blast", disease_name="Rice Blast", severity="Medium", confidence=0.86, created_at=now - datetime.timedelta(days=1)),

                # Bathinda: Wheat rust
                CropReport(village_id="VIL-BATHINDA", farmer_name="Gurpreet Singh", crop_type="Wheat", disease_id="wheat_rust", disease_name="Wheat Stripe/Yellow Rust", severity="Low", confidence=0.88, created_at=now - datetime.timedelta(days=2))
            ]
            db.add_all(sample_reports)
            db.commit()
    finally:
        db.close()
