const RecipeCard = require('./RecipeCard');

function favorite(recipes) {
  const main = document.querySelector('.main');

  const favSection = document.createElement('ul');
  favSection.classList.add('main-fav');
  main.append(favSection);

  recipes.map((recipe) => RecipeCard(recipe, '.main-fav'));
}

module.exports = favorite;
