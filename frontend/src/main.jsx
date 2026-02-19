import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./components/Header.jsx";
import { ScanForm } from "./components/ScanForm.jsx";
import { ProductTable } from "./components/ProductTable.jsx";
import { ProductInsight } from "./components/ProductInsight.jsx";
import { compareProducts, fetchProducts, scanProduct } from "./lib/api.js";
import "./styles/main.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [comparison, setComparison] = useState(null);

  const refresh = async (q = "") => {
    const data = await fetchProducts(q);
    setProducts(data.items);
    if (!selected && data.items.length) setSelected(data.items[0]);
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      refresh(search);
    }, 250);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function runComparison() {
      if (!selected || products.length < 2) {
        setComparison(null);
        return;
      }
      const candidate = products.find((item) => item.id !== selected.id);
      if (!candidate) {
        setComparison(null);
        return;
      }

      try {
        const data = await compareProducts(selected.id, candidate.id);
        setComparison(data);
      } catch {
        setComparison(null);
      }
    }

    runComparison();
  }, [selected, products]);

  const selectedId = useMemo(() => selected?.id, [selected]);

  const handleScan = async (formData) => {
    setLoading(true);
    try {
      const result = await scanProduct(formData);
      setSelected(result.product);
      await refresh(search);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <Header />
      <section className="grid">
        <ScanForm onSubmit={handleScan} loading={loading} />
        <ProductInsight product={selected} comparison={comparison} key={selectedId} />
        <ProductTable products={products} onSelect={setSelected} search={search} onSearchChange={setSearch} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
