export function ProductInsight({ product, comparison }) {
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
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Observed label confidence:</strong> 0.92</p>
      <p><strong>Estimated composition confidence:</strong> {product.ingredients?.length ? 0.64 : 0.35}</p>
      {product.duplicateOf && <p className="pill">Potential duplicate of record: {product.duplicateOf}</p>}
      <ul className="insight-list">
        {product.deformulationEstimate?.map((row) => (
          <li key={`${product.id}-${row.ingredient}`}>
            <span>{row.ingredient}</span>
            <span>{row.likelyRange}</span>
            <small>{row.inferredFunction}</small>
          </li>
        ))}
      </ul>
      {comparison && (
        <div className="compare-box">
          <h3>Comparison snapshot</h3>
          <p>Overlap ingredients: {comparison.overlapCount}</p>
          <p>Only in selected: {comparison.onlyInA.slice(0, 6).join(", ") || "-"}</p>
        </div>
      )}
      <a className="export-link" href={`http://localhost:8787/api/products/${product.id}/export`} target="_blank" rel="noreferrer">Export CSV</a>
    </div>
  );
}
