import { parseInciList } from "../utils/inci.js";

const CLAIM_KEYWORDS = ["dermatologically tested", "paraben free", "sulfate free", "hypoallergenic", "tear free", "for baby", "anti dandruff"];

export function extractClaims(text = "") {
  const lower = text.toLowerCase();
  return CLAIM_KEYWORDS.filter((claim) => lower.includes(claim));
}

export function parseLabelText(labelText = "") {
  const lines = labelText
    .split(/\n|\r/)
    .map((line) => line.trim())
    .filter(Boolean);

  const productName = lines[0] || "Unknown product";
  const brandMatch = labelText.match(/brand\s*:?\s*(.+)/i);
  const manufacturerMatch = labelText.match(/manufactured by\s*:?\s*(.+)/i);
  const sizeMatch = labelText.match(/(\d+\s?(ml|g|kg|oz))/i);
  const ingredientMatch = labelText.match(/ingredients?\s*:?\s*(.+)/i);

  const rawIngredientList = ingredientMatch?.[1] || "";

  return {
    productName,
    brand: brandMatch?.[1]?.trim() || "Unknown brand",
    manufacturer: manufacturerMatch?.[1]?.trim() || "Unknown manufacturer",
    packSize: sizeMatch?.[1] || "Unknown",
    claims: extractClaims(labelText),
    ingredients: parseInciList(rawIngredientList),
    warnings: lines.filter((line) => /warning|caution|avoid/i.test(line)),
    directions: lines.filter((line) => /apply|use|massage|rinse/i.test(line))
  };
}
