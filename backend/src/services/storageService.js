import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomUUID } from "uuid";

const dbPath = resolve(process.cwd(), "backend", "data", "products.json");

function ensureDb() {
  if (!existsSync(dbPath)) {
    mkdirSync(dirname(dbPath), { recursive: true });
    writeFileSync(dbPath, JSON.stringify({ products: [] }, null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(readFileSync(dbPath, "utf-8"));
}

function writeDb(db) {
  writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function productFingerprint(product) {
  return [product.barcode || "", product.productName || "", product.brand || "", product.packSize || ""]
    .join("|")
    .toLowerCase();
}

export function saveProduct(product) {
  const db = readDb();
  const fingerprint = productFingerprint(product);
  const duplicateOf = db.products.find((item) => productFingerprint(item) === fingerprint)?.id || null;

  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    duplicateOf,
    ...product
  };

  db.products.unshift(record);
  writeDb(db);
  return record;
}

export function listProducts(query = "") {
  const db = readDb();
  if (!query) return [...db.products];

  const q = query.toLowerCase();
  return db.products.filter((product) =>
    [product.productName, product.brand, product.category, product.barcode]
      .map((field) => String(field || "").toLowerCase())
      .some((field) => field.includes(q))
  );
}

export function getProductById(id) {
  return readDb().products.find((product) => product.id === id);
}

export function compareProducts(idA, idB) {
  const db = readDb();
  const a = db.products.find((product) => product.id === idA);
  const b = db.products.find((product) => product.id === idB);

  if (!a || !b) return null;

  const ingredientSetA = new Set((a.ingredients || []).map((item) => item.canonical.toLowerCase()));
  const ingredientSetB = new Set((b.ingredients || []).map((item) => item.canonical.toLowerCase()));

  const inBoth = [...ingredientSetA].filter((name) => ingredientSetB.has(name));
  const onlyA = [...ingredientSetA].filter((name) => !ingredientSetB.has(name));
  const onlyB = [...ingredientSetB].filter((name) => !ingredientSetA.has(name));

  return {
    productA: { id: a.id, name: a.productName, brand: a.brand },
    productB: { id: b.id, name: b.productName, brand: b.brand },
    overlapCount: inBoth.length,
    overlapIngredients: inBoth,
    onlyInA: onlyA,
    onlyInB: onlyB
  };
}
