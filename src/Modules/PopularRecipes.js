const RecipeCard = require('./RecipeCard');

function PopularRecipes(popularRecipesArray) {
  const main = document.querySelector('.main');

  const popularHeader = document.createElement('h2');
  popularHeader.innerHTML = 'recipe of the day';
  popularHeader.classList.add('main-heading');
  main.append(popularHeader);

  const popularSection = document.createElement('ul');
  popularSection.classList.add('main-popular');
  main.append(popularSection);

  if (popularRecipesArray && popularRecipesArray.length > 0) {
    popularRecipesArray.map((recipe) => RecipeCard(recipe, '.main-popular'));
  } else {
    const noData = document.createElement('p');
    noData.innerHTML = 'There is no recipes for today';
    noData.classList.add('main-noData');
    popularSection.append(noData);
  }
}

module.exports = PopularRecipes;
