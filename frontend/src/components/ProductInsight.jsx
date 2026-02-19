export function ProductInsight({ product }) {
  if (!product) {
    return (
      <div className="card">
        <h2>Composition insight</h2>
        <p>Select a product to view inferred composition ranges and confidence.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{product.productName}</h2>
      <p><strong>Observed label confidence:</strong> 0.92</p>
      <p><strong>Estimated composition confidence:</strong> 0.64</p>
      <ul className="insight-list">
        {product.deformulationEstimate?.map((row) => (
          <li key={`${product.id}-${row.ingredient}`}>
            <span>{row.ingredient}</span>
            <span>{row.likelyRange}</span>
            <small>{row.inferredFunction}</small>
          </li>
        ))}
      </ul>
      <a className="export-link" href={`http://localhost:8787/api/products/${product.id}/export`} target="_blank" rel="noreferrer">Export CSV</a>
    </div>
  );
}
