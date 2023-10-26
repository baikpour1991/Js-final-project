const CardClickHandler = require('./RecipeDetailsDrawer');
const AddRemoveFavorite = require('./AddRemoveFavorite');
const RemoveDataForm = require('./RemoveDataForm');
const AddEditDataForm = require('./AddEditDataForm');

function RecipeCard(recipe, section) {
  const recipeCard = document.createElement('li');
  recipeCard.classList.add('card');
  recipeCard.setAttribute('data-id', recipe.id);

  const favBtn = document.createElement('button');
  favBtn.setAttribute('data-id', recipe.id);
  favBtn.setAttribute('data-page', section);
  favBtn.classList.add('btn-fav', 'button');
  if (recipe.isFavorite === true) {
    favBtn.classList.add('favorite');
  }

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn-edit', 'button');
  editBtn.setAttribute('data-id', recipe.id);
  editBtn.setAttribute('data-page', section);

  const delBtn = document.createElement('button');
  delBtn.classList.add('btn-del', 'button');
  delBtn.setAttribute('data-id', recipe.id);
  delBtn.setAttribute('data-page', section);

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  buttons.setAttribute('data-id', recipe.id);
  buttons.append(favBtn);
  buttons.append(editBtn);
  buttons.append(delBtn);

  const recipeName = document.createElement('h3');
  recipeName.classList.add('card-name');
  recipeName.innerHTML = recipe.name;
  recipeName.setAttribute('data-id', recipe.id);

  const recipeDetails = document.createElement('div');
  recipeDetails.classList.add('card-details');
  recipeDetails.setAttribute('data-id', recipe.id);

  const ingredients = document.createElement('span');
  ingredients.innerHTML = `${recipe.ingredients.length} ingredients`;
  ingredients.setAttribute('data-id', recipe.id);

  const time = document.createElement('span');
  time.innerHTML = `${recipe.cookingTime} min`;
  time.setAttribute('data-id', recipe.id);

  recipeDetails.append(ingredients);
  recipeDetails.append(time);

  recipeCard.append(buttons);
  recipeCard.append(recipeName);
  recipeCard.append(recipeDetails);

  //          Event Listeners

  favBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const id = favBtn.getAttribute('data-id');
    const page = favBtn.getAttribute('data-page');
    AddRemoveFavorite(id, page);
  });

  delBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    RemoveDataForm(event.target.dataset.id, event.target.dataset.page);
  });

  editBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    AddEditDataForm('EDIT', recipe);
  });

  recipeCard.addEventListener('click', (event) => {
    CardClickHandler(event, section);
  });

  //          Append to the related section

  const appendSection = document.querySelector(`${section}`);
  appendSection.append(recipeCard);
}

module.exports = RecipeCard;
