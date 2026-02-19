import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./components/Header.jsx";
import { ScanForm } from "./components/ScanForm.jsx";
import { ProductTable } from "./components/ProductTable.jsx";
import { ProductInsight } from "./components/ProductInsight.jsx";
import { fetchProducts, scanProduct } from "./lib/api.js";
import "./styles/main.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    const data = await fetchProducts();
    setProducts(data.items);
    if (!selected && data.items.length) setSelected(data.items[0]);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleScan = async (formData) => {
    setLoading(true);
    try {
      const result = await scanProduct(formData);
      setSelected(result.product);
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <Header />
      <section className="grid">
        <ScanForm onSubmit={handleScan} loading={loading} />
        <ProductInsight product={selected} />
        <ProductTable products={products} onSelect={setSelected} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
