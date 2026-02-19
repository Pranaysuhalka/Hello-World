export async function extractTextFromImages(files = []) {
  if (!files.length) return "";

  return files
    .map((file, index) => {
      const name = file.originalname || `image-${index + 1}`;
      return [
        `Image ${index + 1}: ${name}`,
        "Ingredients: Aqua, Glycerin, Niacinamide, Panthenol, Parfum",
        "Dermatologically Tested | Paraben Free",
        "Brand: Demo Brand",
        "Manufactured by: Demo Labs Pvt Ltd",
        "Directions: Apply to damp skin and massage gently.",
        "Warning: Avoid contact with eyes."
      ].join("\n");
    })
    .join("\n\n");
}
