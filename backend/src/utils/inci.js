const KNOWN_INGREDIENTS = {
  aqua: { canonical: "Aqua", function: "Solvent" },
  glycerin: { canonical: "Glycerin", function: "Humectant" },
  niacinamide: { canonical: "Niacinamide", function: "Skin conditioning" },
  parfum: { canonical: "Parfum", function: "Fragrance" },
  sodiumlaurethsulfate: { canonical: "Sodium Laureth Sulfate", function: "Surfactant" },
  cocamidopropylbetaine: { canonical: "Cocamidopropyl Betaine", function: "Surfactant" },
  panthenol: { canonical: "Panthenol", function: "Humectant" },
  zincoxide: { canonical: "Zinc Oxide", function: "UV filter" }
};

const normalize = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

export function parseInciList(raw = "") {
  return raw
    .split(/,|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((ingredient) => {
      const key = normalize(ingredient);
      const known = KNOWN_INGREDIENTS[key];
      return {
        source: ingredient,
        canonical: known?.canonical || ingredient,
        function: known?.function || "Unknown"
      };
    });
}
