const RemoveElementHandler = require('./RemoveElementHandler');
const IngredientRow = require('./IngredientRow');
const getAllIngredients = require('./GetIngredients');
const SendDataToDataBase = require('./SendDataToDataBase');

async function AddEditDataForm(type, recipe) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'overlay-add');

  const form = document.createElement('form');
  form.classList.add('form');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('closeBtn', 'form-closeBtn');

  const header = document.createElement('h4');
  header.classList.add('form-header');
  header.textContent = 'adding new recipe';
  if (type === 'EDIT') {
    header.textContent = 'editing your recipe';
  }

  const formRow1 = document.createElement('div');
  formRow1.classList.add('form-row');

  const nameField = document.createElement('div');
  nameField.classList.add('form-field', 'field-large');

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('label');
  nameLabel.setAttribute('for', 'form-name');
  nameLabel.textContent = 'Name of recipe';

  const nameInput = document.createElement('input');
  nameInput.classList.add('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', 'Name');
  nameInput.setAttribute('id', 'form-name');
  nameInput.setAttribute('required', 'true');
  if (type === 'EDIT') {
    nameInput.value = recipe.name;
  }

  nameField.append(nameLabel);
  nameField.append(nameInput);

  const timeField = document.createElement('div');
  timeField.classList.add('form-field');

  const timeLabel = document.createElement('label');
  timeLabel.classList.add('label');
  timeLabel.setAttribute('for', 'form-time');
  timeLabel.textContent = 'Cooking time';

  const timeBlock = document.createElement('div');
  timeBlock.classList.add('form-block');

  const timeInput = document.createElement('input');
  timeInput.classList.add('input');
  timeInput.setAttribute('type', 'number');
  timeInput.setAttribute('placeholder', '15');
  timeInput.setAttribute('id', 'form-time');
  timeInput.setAttribute('min', '0');
  timeInput.setAttribute('required', 'true');
  if (type === 'EDIT') {
    timeInput.value = recipe.cookingTime;
  }

  const timeUnitLabel = document.createElement('label');
  timeUnitLabel.classList.add('label');
  timeUnitLabel.setAttribute('for', 'form-time');
  timeUnitLabel.textContent = 'min';

  timeBlock.append(timeInput);
  timeBlock.append(timeUnitLabel);

  timeField.append(timeLabel);
  timeField.append(timeBlock);

  formRow1.append(nameField);
  formRow1.append(timeField);

  const formRow2 = document.createElement('div');
  formRow2.classList.add('form-row');

  const descriptionField = document.createElement('div');
  descriptionField.classList.add('form-field');

  const descriptionLabel = document.createElement('label');
  descriptionLabel.classList.add('label');
  descriptionLabel.setAttribute('for', 'form-textArea');
  descriptionLabel.textContent = 'Description';

  const descriptionTextarea = document.createElement('textarea');
  descriptionTextarea.classList.add('form-textArea');
  descriptionTextarea.setAttribute('id', 'form-textArea');
  descriptionTextarea.setAttribute('placeholder', 'Description');
  descriptionTextarea.setAttribute('required', 'true');
  if (type === 'EDIT') {
    descriptionTextarea.value = recipe.description;
  }

  descriptionField.append(descriptionLabel);
  descriptionField.append(descriptionTextarea);

  formRow2.append(descriptionField);

  const formRow3 = document.createElement('div');
  formRow3.classList.add('form-row', 'form-labels');

  const ingredientLabel = document.createElement('span');
  ingredientLabel.classList.add('label', 'form-labels-ingredient');
  ingredientLabel.textContent = 'Ingredients';

  const quantityLabel = document.createElement('span');
  quantityLabel.classList.add('label', 'form-labels-quantity');
  quantityLabel.textContent = 'Quantity';

  formRow3.append(ingredientLabel);
  formRow3.append(quantityLabel);

  const ingredientsList = document.createElement('ul');
  ingredientsList.classList.add('form-ingredients');

  const addIngredientButton = document.createElement('button');
  addIngredientButton.classList.add('form-addIngredient');
  addIngredientButton.textContent = '+ Add ingredient';

  const addRecipeButton = document.createElement('button');
  addRecipeButton.setAttribute('type', 'submit');
  addRecipeButton.classList.add('form-addBtn', 'addBtn');
  addRecipeButton.textContent = 'Add new recipe';
  if (type === 'EDIT') {
    addRecipeButton.textContent = 'edit recipe';
  }

  form.append(closeBtn);
  form.append(header);
  form.append(formRow1);
  form.append(formRow2);
  form.append(formRow3);
  form.append(ingredientsList);
  form.append(addIngredientButton);
  form.append(addRecipeButton);

  overlay.append(form);

  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    RemoveElementHandler('.overlay-add');
  });

  form.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  addIngredientButton.addEventListener('click', (event) => {
    event.preventDefault();
    const index = Math.ceil(Math.random() * 1000);
    IngredientRow(undefined, index);
  });

  if (type === 'ADD') {
    IngredientRow(undefined, 0);
  }

  if (type === 'EDIT') {
    const ingredientArray = await getAllIngredients(recipe.ingredients);
    ingredientArray.forEach((item, index) => {
      IngredientRow(item, index);
    });
  }

  // Add and Edit Logic and Get Form Data Object And Send It To The Related Function To Send To Server

  form.addEventListener('submit', () => {
    const formData = {};

    formData.id = recipe ? recipe.id : Math.ceil(Math.random() * 1000);
    formData.name = nameInput.value;
    formData.description = descriptionTextarea.value;
    formData.label = recipe ? recipe.label : 'Main Course';
    formData.cookingTime = +timeInput.value;
    formData.isFavorite = recipe ? recipe.isFavorite : false;
    formData.isPopular = recipe ? recipe.isPopular : false;

    const ingredientRows = document.querySelectorAll('.form-ingredient');
    formData.ingredients = [];

    ingredientRows.forEach((ingredientRow) => {
      const ingredientId = ingredientRow.querySelector('.select-value').getAttribute('data-id');
      const ingredientAmount = ingredientRow.querySelector('.input-ingredient').value;
      let ingredientAmountType = ingredientRow.querySelector('.select-measure .selected').textContent;

      if (ingredientAmountType === 'tb') {
        ingredientAmountType = 'tablespoon';
      }
      if (ingredientAmountType === 'pc') {
        ingredientAmountType = 'piece';
      }

      formData.ingredients.push({
        ingredientId: +ingredientId,
        amount: +ingredientAmount,
        amountType: ingredientAmountType,
      });
    });
    SendDataToDataBase(type, formData);
  });

  overlay.addEventListener('click', () => {
    RemoveElementHandler('.overlay-add');
  });

  const main = document.querySelector('.main');
  main.append(overlay);
}

module.exports = AddEditDataForm;
