import express from "express";
import multer from "multer";
import { z } from "zod";
import { extractTextFromImages } from "../services/ocrService.js";
import { parseLabelText } from "../services/parserService.js";
import { estimateComposition } from "../services/deformulationService.js";
import { compareProducts, getProductById, listProducts, saveProduct } from "../services/storageService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const scanSchema = z.object({
  barcode: z.string().optional(),
  category: z.string().default("skincare"),
  notes: z.string().optional(),
  manualLabelText: z.string().optional()
});

router.post("/scan", upload.array("labelImages", 6), async (req, res) => {
  const parsed = scanSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const ocrText = await extractTextFromImages(req.files || []);
  const mergedSourceText = [parsed.data.manualLabelText || "", ocrText].filter(Boolean).join("\n\n");
  const labelFacts = parseLabelText(mergedSourceText);
  const estimates = estimateComposition(labelFacts.ingredients);

  const record = saveProduct({
    barcode: parsed.data.barcode || null,
    category: parsed.data.category,
    notes: parsed.data.notes || "",
    sourceText: mergedSourceText,
    ...labelFacts,
    deformulationEstimate: estimates
  });

  return res.status(201).json({
    confidenceBands: {
      observedFacts: 0.92,
      estimatedComposition: labelFacts.ingredients.length ? 0.64 : 0.35
    },
    product: record
  });
});

router.get("/products", (req, res) => {
  const items = listProducts(req.query.q || "");
  res.json({ count: items.length, items });
});

router.get("/products/:id", (req, res) => {
  const item = getProductById(req.params.id);
  if (!item) return res.status(404).json({ error: "Product not found" });
  return res.json(item);
});

router.get("/products/:id/export", (req, res) => {
  const item = getProductById(req.params.id);
  if (!item) return res.status(404).json({ error: "Product not found" });

  const headers = ["Product", "Brand", "Category", "Ingredient", "Function", "Likely Range"];
  const rows = item.deformulationEstimate.map((row) => [item.productName, item.brand, item.category, row.ingredient, row.inferredFunction, row.likelyRange]);
  const csv = [headers, ...rows]
    .map((line) => line.map((col) => `"${String(col).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=\"${item.id}.csv\"`);
  return res.send(csv);
});

router.get("/compare", (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) return res.status(400).json({ error: "Query params a and b are required" });

  const comparison = compareProducts(String(a), String(b));
  if (!comparison) return res.status(404).json({ error: "One or both products not found" });

  return res.json(comparison);
});

export default router;
