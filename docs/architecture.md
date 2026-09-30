# KhetRakshak (Field Guardian) — System Architecture

## 🌾 High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Farmer Mobile PWA                        │
│   - Multi-lingual Interface (Hi, Te, Mr, Ta, Kn, En)        │
│   - Camera / Live Leaf Sample Test Viewfinder               │
│   - Web Speech Synthesis (TTS) & Recognition (STT)          │
│   - Offline IndexedDB / LocalStorage Advisory Cache         │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON & Multipart
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 FastAPI Gateway & API Layer                 │
├─────────────────┬────────────────────────────┬──────────────┤
│  /api/diagnose  │  /api/risk/village, /map   │ /api/advisory│
└────────┬────────┴────────────┬───────────────┴──────┬───────┘
         │                     │                      │
         ▼                     ▼                      ▼
┌────────────────┐     ┌───────────────┐      ┌───────────────┐
│ Vision Model   │     │ Risk Engine   │      │ Advisory KB   │
│ - MobileNet /  │     │ - Crowd-Rpt   │      │ - ICAR Vetted │
│   PlantVillage │     │ - Humidity/Rx │      │   Cultural/Org│
│ - Top-3 Alts   │     │ - Traffic-Lgt │      │ - KVK Helpline│
└────────┬───────┘     └───────┬───────┘      └───────┬───────┘
         │                     │                      │
         └─────────────────────┼──────────────────────┘
                               ▼
                ┌─────────────────────────────┐
                │ SQLite / PostgreSQL DB      │
                │ - Panchayats, Reports, Logs │
                └─────────────────────────────┘
```

---

## 🔬 Core Subsystems

### 1. Vision Classifier (`backend/app/ml/`)
- Analyzes leaf symptoms (chlorosis, concentric rings, spindle-shaped lesions, vein thickening, window-pane holes).
- Output: Primary disease diagnosis, calibrated confidence percentage, symptom breakdown, and honest top-3 alternative candidates.

### 2. Village Outbreak Risk Engine (`backend/app/risk_engine/`)
- **Formula**:
  $$\text{Risk Score} = 0.50 \times \text{Report Density} + 0.30 \times \text{Microclimate Risk} + 0.20 \times \text{Crop Monoculture}$$
- Buckets into **Green (Low)**, **Amber (Medium)**, and **Red (High Outbreak)**.
- Integrated with micro-climate humidity thresholds to forecast fungal spore proliferation.

### 3. Vetted Safe Advisory Knowledge Base (`backend/app/advisory_kb/`)
- Strict safety guardrail: Free-form chemical hallucinations are blocked.
- 3-tier safe remedy breakdown:
  1. **Tier 1 (Cultural)**: Pruning infected canopy, soil ridging, morning drip irrigation.
  2. **Tier 2 (Organic / Biological)**: Neem oil (10,000 ppm), *Trichoderma viride*, *Pseudomonas fluorescens*, sticky traps, *Bt*.
  3. **Tier 3 (High Outbreak Helpline)**: National Kisan Call Centre (`1800-180-1551`), local Krishi Vigyan Kendra (KVK) officer consultation.

### 4. Offline & Low-Bandwidth Resilience
- Auto-caches recent crop diagnoses and emergency contact details locally on device.
- Works offline in disconnected farm fields with full voice and remedy guidance.
