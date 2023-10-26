const RecipeCard = require('./RecipeCard');

function AllRecipes(recipesArray) {
  const main = document.querySelector('.main');

  const allHeader = document.createElement('h2');
  allHeader.innerHTML = 'explore recipes';
  allHeader.classList.add('main-heading');
  main.append(allHeader);

  const allSection = document.createElement('ul');
  allSection.classList.add('main-all');
  main.append(allSection);

  if (recipesArray && recipesArray.length > 0) {
    recipesArray.map((recipe) => RecipeCard(recipe, '.main-all'));
  } else {
    const noData = document.createElement('p');
    noData.innerHTML = 'There is no recipes';
    noData.classList.add('main-noData');
    allSection.append(noData);
  }
}

module.exports = AllRecipes;
