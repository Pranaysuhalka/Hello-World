export function ProductTable({ products, onSelect, search, onSearchChange }) {
  return (
    <div className="card table-card">
      <div className="table-header-row">
        <h2>Knowledge Database</h2>
        <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search by product, brand, barcode" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item)}>
              <td>{item.productName}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.duplicateOf ? "Possible duplicate" : "New"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!products.length && <p>No products yet. Scan one to populate your private DB.</p>}
    </div>
  );
}
