import { randomUUID } from "uuid";

const products = [];

export function saveProduct(product) {
  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...product
  };
  products.push(record);
  return record;
}

export function listProducts(query = "") {
  if (!query) return [...products];
  const q = query.toLowerCase();
  return products.filter((product) =>
    [product.productName, product.brand, product.category].some((field) =>
      String(field || "")
        .toLowerCase()
        .includes(q)
    )
  );
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}
