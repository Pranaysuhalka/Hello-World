# OpenClaw Product Intelligence (Skincare / Haircare / Babycare)

An open-source-first full-stack MVP inspired by modern product intelligence workflows (barcode + label OCR + INCI parsing + confidence-scored formula estimation).

## What this includes

### Frontend (React + Vite)
- Barcode/category/notes intake
- Front/back label image upload (drag/drop)
- Manual text correction field to supplement OCR
- Product database table with search
- Composition insight view + duplicate indicator
- Automatic side-by-side ingredient overlap snapshot
- CSV export link per product

### Backend (Node + Express)
- `POST /api/scan` for barcode + image intake
- OCR adapter service (currently mock, pluggable for Tesseract/PaddleOCR)
- Label parser (ingredients, claims, manufacturer, pack size)
- Deformulation-style estimate engine with confidence bands
- Search/list APIs, compare API, and per-product CSV export
- JSON file persistence (`backend/data/products.json`) with duplicate fingerprinting

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

## API endpoints

- `GET /health`
- `POST /api/scan`
- `GET /api/products?q=<search>`
- `GET /api/products/:id`
- `GET /api/products/:id/export`
- `GET /api/compare?a=<id>&b=<id>`

## Suggested open-source upgrades

1. Swap mock OCR in `backend/src/services/ocrService.js` with Tesseract.js or PaddleOCR microservice.
2. Move JSON storage to SQLite/Postgres.
3. Add fuzzy duplicate matching (MinHash/SimHash + pgvector).
4. Add market-specific compliance ruleset modules (India/GCC/EU).
5. Add auth + multi-user workspace model.
