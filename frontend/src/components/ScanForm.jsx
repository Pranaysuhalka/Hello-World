import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

export function ScanForm({ onSubmit, loading }) {
  const { acceptedFiles, getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 6
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    acceptedFiles.forEach((file) => form.append("labelImages", file));
    onSubmit(form);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>New Product Scan</h2>
      <label>
        Barcode
        <input name="barcode" placeholder="8901234567890" />
      </label>
      <label>
        Category
        <select name="category" defaultValue="skincare">
          <option value="skincare">Skincare</option>
          <option value="haircare">Haircare</option>
          <option value="babycare">Babycare</option>
        </select>
      </label>
      <label>
        Manual label text (optional override)
        <textarea name="manualLabelText" rows={4} placeholder="Paste ingredients/claims text from packaging if OCR misses details" />
      </label>
      <label>
        Notes
        <textarea name="notes" placeholder="Optional procurement or benchmark notes" rows={3} />
      </label>

      <div className={`dropzone ${isDragActive ? "active" : ""}`} {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadCloud size={20} />
        <p>Drop front/back label images here or click to upload</p>
        <small>{acceptedFiles.length} file(s) selected</small>
      </div>

      <button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Analyze Product"}</button>
    </form>
  );
}
