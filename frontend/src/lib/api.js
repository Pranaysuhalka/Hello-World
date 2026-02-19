const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787/api";

export async function scanProduct(formData) {
  const res = await fetch(`${API_BASE}/scan`, {
    method: "POST",
    body: formData
  });
  if (!res.ok) throw new Error("Scan failed");
  return res.json();
}

export async function fetchProducts(query = "") {
  const q = query ? `?q=${encodeURIComponent(query)}` : "";
  const res = await fetch(`${API_BASE}/products${q}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function compareProducts(a, b) {
  const res = await fetch(`${API_BASE}/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
  if (!res.ok) throw new Error("Compare failed");
  return res.json();
}
