const FUNCTION_RANGES = {
  Solvent: "40-80%",
  Humectant: "2-10%",
  Surfactant: "5-25%",
  "Skin conditioning": "1-8%",
  Fragrance: "0.1-1%",
  "UV filter": "1-20%",
  Unknown: "0.1-5%"
};

export function estimateComposition(ingredients = []) {
  return ingredients.map((ingredient, index) => ({
    ingredient: ingredient.canonical,
    inferredFunction: ingredient.function,
    likelyRange: FUNCTION_RANGES[ingredient.function] || FUNCTION_RANGES.Unknown,
    confidence: index < 5 ? 0.78 : 0.52,
    rationale: "Estimated using ingredient order heuristics + function priors from open cosmetic references."
  }));
}
