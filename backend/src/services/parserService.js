import { parseInciList } from "../utils/inci.js";

const CLAIM_KEYWORDS = [
  "dermatologically tested",
  "paraben free",
  "sulfate free",
  "hypoallergenic",
  "tear free",
  "for baby",
  "anti dandruff",
  "fragrance free",
  "clinically tested"
];

export function extractClaims(text = "") {
  const lower = text.toLowerCase();
  return CLAIM_KEYWORDS.filter((claim) => lower.includes(claim));
}

function fromLinePrefix(lines, prefixes) {
  const match = lines.find((line) => prefixes.some((prefix) => line.toLowerCase().startsWith(prefix)));
  if (!match) return null;
  return match.split(":").slice(1).join(":").trim() || null;
}

export function parseLabelText(labelText = "") {
  const lines = labelText
    .split(/\n|\r/)
    .map((line) => line.trim())
    .filter(Boolean);

  const productName = lines[0] || "Unknown product";
  const brand = fromLinePrefix(lines, ["brand:", "brand -"]) || "Unknown brand";
  const manufacturer = fromLinePrefix(lines, ["manufactured by:", "marketed by:"]) || "Unknown manufacturer";
  const ingredientLine = fromLinePrefix(lines, ["ingredients:", "ingredient:"]) || "";

  const sizeMatch = labelText.match(/(\d+(\.\d+)?\s?(ml|l|g|kg|oz))/i);

  return {
    productName,
    brand,
    manufacturer,
    packSize: sizeMatch?.[1] || "Unknown",
    claims: extractClaims(labelText),
    ingredients: parseInciList(ingredientLine),
    warnings: lines.filter((line) => /warning|caution|avoid|patch test/i.test(line)),
    directions: lines.filter((line) => /apply|use|massage|rinse|leave on/i.test(line))
  };
}
