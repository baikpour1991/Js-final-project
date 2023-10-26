async function FindRecipeById(id) {
  if (id) {
    const URL = 'http://localhost:3000/recipes';
    const recipes = await fetch(URL).then((response) => response.json());
    const recipe = await recipes.filter((item) => +item.id === +id);
    return recipe[0];
  }
}

module.exports = FindRecipeById;
