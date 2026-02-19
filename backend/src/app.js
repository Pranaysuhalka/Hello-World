import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "product-intelligence-api" });
});

app.use("/api", productRoutes);
