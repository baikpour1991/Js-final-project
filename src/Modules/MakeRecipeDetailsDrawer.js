/* eslint-disable no-shadow */
/* eslint-disable import/no-useless-path-segments */
const FindRecipeById = require('./FindRecipeById');
const GetIngredients = require('./GetIngredients');
const RemoveElementHandler = require('./RemoveElementHandler');
const AddRemoveFavorite = require('./AddRemoveFavorite');
const RemoveDataForm = require('./RemoveDataForm');
const AddEditDataForm = require('./AddEditDataForm');

const recipeImg = require('./../../img/food.png');

async function MakeRecipeDetailsDrawer(id, targetPage) {
  const recipe = await FindRecipeById(id);
  const ingredientsArray = await GetIngredients(recipe.ingredients);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const recipeDetailsDrawer = document.createElement('div');
  recipeDetailsDrawer.classList.add('drawer');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('drawer-closeBtn', 'closeBtn');

  const drawerMedia = document.createElement('div');
  drawerMedia.classList.add('drawer-media');
  const img = document.createElement('img');
  img.classList.add('drawer-img');
  img.src = recipeImg;

  const details = document.createElement('div');
  details.classList.add('drawer-details');

  const detailsName = document.createElement('div');
  detailsName.classList.add('drawer-name');

  const name = document.createElement('span');
  name.innerHTML = recipe.name;

  const time = document.createElement('span');
  time.innerHTML = `${recipe.cookingTime} min.`;

  const description = document.createElement('p');
  description.classList.add('drawer-description');
  description.innerHTML = recipe.description;

  const ingredientsHeader = document.createElement('p');
  ingredientsHeader.innerHTML = 'ingredients';
  ingredientsHeader.classList.add('drawer-ingredientsHeader');

  const ingredients = document.createElement('ul');
  ingredients.classList.add('drawer-ingredients');

  ingredientsArray.forEach((ingredientsObj) => {
    const ingredient = document.createElement('li');
    ingredient.classList.add('drawer-ingredient');
    ingredient.innerHTML = ingredientsObj.name;
    ingredients.append(ingredient);
  });

  const favBtn = document.createElement('button');
  favBtn.classList.add('btn-fav', 'button', 'drawer-btn-fav');
  favBtn.setAttribute('data-id', id);
  if (recipe.isFavorite === true) {
    favBtn.classList.add('favorite');
  }

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn-edit', 'button', 'drawer-btn-edit');
  editBtn.setAttribute('data-id', id);

  const delBtn = document.createElement('button');
  delBtn.classList.add('btn-del', 'button', 'drawer-btn-del');
  delBtn.setAttribute('data-id', id);

  const buttons = document.createElement('div');
  buttons.classList.add('drawer-buttons');

  buttons.append(favBtn);
  buttons.append(editBtn);
  buttons.append(delBtn);

  detailsName.append(name);
  detailsName.append(time);
  drawerMedia.append(img);

  details.append(detailsName);
  details.append(description);
  details.append(ingredientsHeader);
  details.append(ingredients);

  recipeDetailsDrawer.append(closeBtn);
  recipeDetailsDrawer.append(drawerMedia);
  recipeDetailsDrawer.append(details);
  recipeDetailsDrawer.append(buttons);

  overlay.append(recipeDetailsDrawer);

  //             ADD EVENT LISTENER

  favBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const id = favBtn.getAttribute('data-id');
    AddRemoveFavorite(id, targetPage, 'drawer');
  });

  delBtn.addEventListener('click', () => {
    RemoveDataForm(id, targetPage);
  });

  closeBtn.addEventListener('click', () => {
    RemoveElementHandler('.overlay');
  });

  editBtn.addEventListener('click', () => {
    AddEditDataForm('EDIT', recipe);
  });

  overlay.addEventListener('click', (event) => {
    const classes = [...event.target.classList];
    if (classes.includes('overlay')) {
      RemoveElementHandler('.overlay');
    }
  });

  const main = document.querySelector('.main');
  main.append(overlay);
}

module.exports = MakeRecipeDetailsDrawer;
