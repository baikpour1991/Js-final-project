const MainHeader = require('./MainHeader');
const PopularRecipes = require('./PopularRecipes');
const AllRecipes = require('./AllRecipes');
const Favorite = require('./Favorite');
const MakeRecipeDetailsDrawer = require('./MakeRecipeDetailsDrawer');

async function Main(page) {
  const main = document.querySelector('.main');
  main.innerHTML = '';

  const URL = 'http://localhost:3000/recipes';
  const response = await fetch(URL);
  const recipesArray = await response.json();

  if (page === 'all') {
    const popularRecipesArray = await recipesArray.filter((recipe) => recipe.isPopular === true);
    MainHeader('all');
    PopularRecipes(popularRecipesArray);
    AllRecipes(recipesArray);
  } else if (page === 'fav') {
    const favoriteRecipes = await recipesArray.filter((recipe) => recipe.isFavorite === true);
    MainHeader('fav');
    Favorite(favoriteRecipes);
  }
}

window.addEventListener('databaseUpdated', (event) => {
  const { targetPage, id, section } = event.detail;
  if (targetPage === '.main-all' || targetPage === '.main-popular') {
    Main('all');
  } else if (targetPage === '.main-fav') {
    Main('fav');
  }
  if (section === 'drawer') {
    MakeRecipeDetailsDrawer(id, targetPage);
  }
});

module.exports = Main;
