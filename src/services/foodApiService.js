export const fetchFoodByBarcode = async (code) => {
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${code}.json`
  );
  const data = await res.json();

  if (!data || data.status !== 1 || !data.product) return null;

  const p = data.product;

  // Product Name (supports old + new formats)
  const name =
    p.product_name ||
    p.product_name_en ||
    p.generic_name ||
    "Unknown Product";

  // Brand detection (NEW FIX)
  const brand =
    p.brands ||
    p.brand_owner ||
    p.manufacturing_places ||
    "Unknown";

  // Ingredients extraction
  let ingredientsText = "";
  if (p.ingredients_text) ingredientsText = p.ingredients_text;
  else if (p.ingredients_text_en) ingredientsText = p.ingredients_text_en;
  else if (Array.isArray(p.ingredients)) {
    ingredientsText = p.ingredients.map(i => i.text).join(", ");
  }

  // Nutrition Breakdown
  const n = p.nutriments || {};
  const nutriments = {
    calories: n['energy-kcal'] ?? n.energy ?? "N/A",
    sugar: n.sugars ?? "N/A",
    carbohydrates: n.carbohydrates ?? "N/A",
    fat: n.fat ?? "N/A",
    protein: n.proteins ?? "N/A",
    salt: n.salt ?? "N/A"
  };

  const image = p.image_front_url || p.image_url || null;

  return {
    name,
    brand,
    ingredientsText,
    nutriments,
    image
  };
};