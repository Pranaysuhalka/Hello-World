export async function extractTextFromImages(files = []) {
  if (!files.length) return "";

  return files
    .map((file, index) =>
      `Image ${index + 1}: ${file.originalname}\nIngredients: Aqua, Glycerin, Niacinamide, Parfum\nDermatologically Tested\nBrand: Demo Brand\nManufactured by: Demo Labs`
    )
    .join("\n\n");
}
