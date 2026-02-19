export function ProductTable({ products, onSelect }) {
  return (
    <div className="card table-card">
      <h2>Knowledge Database</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Claims</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item)}>
              <td>{item.productName}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.claims?.slice(0, 2).join(", ") || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!products.length && <p>No products yet. Scan one to populate your private DB.</p>}
    </div>
  );
}
