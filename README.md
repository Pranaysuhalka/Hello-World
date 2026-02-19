# OpenClaw Product Intelligence (Skincare / Haircare / Babycare)

An open-source-first full-stack MVP inspired by modern product intelligence workflows (barcode + label OCR + INCI parsing + confidence-scored formula estimation).

## What this includes

### Frontend (React + Vite)
- Barcode/category/notes intake
- Front/back label image upload (drag/drop)
- Product database table
- Composition insight view with confidence framing
- CSV export link per product

### Backend (Node + Express)
- `POST /api/scan` for barcode + image intake
- OCR adapter service (currently mock, pluggable for Tesseract/PaddleOCR)
- Label parser (ingredients, claims, manufacturer, pack size)
- Deformulation-style estimate engine with confidence bands
- Search/list APIs and per-product CSV export

## Compliance posture

The API explicitly distinguishes:
- **Observed label facts** (higher confidence)
- **Estimated composition ranges** (inferential)

This keeps outputs practical and legally cleaner without lab testing.

## Repository structure

- `frontend/` React client
- `backend/` Express API + parsing/intelligence services
- `shared/` optional shared models/types (placeholder)
- `docs/` implementation notes (placeholder)

## Quick start

```bash
npm install
npm run dev -w backend
npm run dev -w frontend
```

Frontend defaults to `http://localhost:5173` and backend to `http://localhost:8787`.

## Suggested open-source upgrades

1. Swap mock OCR in `backend/src/services/ocrService.js` with Tesseract.js or PaddleOCR microservice.
2. Add SQLite/Postgres persistence in place of in-memory storage.
3. Add duplicate detection and similarity search (MinHash + pgvector).
4. Add market-specific compliance ruleset modules (India/GCC/EU).
5. Add auth + multi-user workspace model.

## MVP-to-v2 roadmap

### 14-day MVP
- Current stack with end-to-end scanning + extraction + export.
- Manual correction panel and ingestion QA queue.

### 45-day v2
- Knowledge graph and RAG assistant.
- Competitor comparison workflows.
- Procurement/COGS estimate plugin hooks.
- Team dashboard with role-based access.
