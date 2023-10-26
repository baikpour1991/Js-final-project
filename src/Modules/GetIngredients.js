/* eslint-disable no-param-reassign */
async function getAllIngredients() {
  const URL = 'http://localhost:3000/ingredients';
  const response = await fetch(URL);
  const allIngredientsData = await response.json();
  return allIngredientsData;
}

async function GetIngredients(ingredientArray) {
  const recipeIngredients = [...ingredientArray];
  const allIngredients = await getAllIngredients();

  const ingredientsMap = new Map(allIngredients.map((item) => [item.id, item.name]));

  recipeIngredients.map((recipe) => {
    const name = ingredientsMap.get(recipe.ingredientId);
    recipe.name = name;
    return recipe;
  });

  return recipeIngredients;
}

module.exports = GetIngredients;
