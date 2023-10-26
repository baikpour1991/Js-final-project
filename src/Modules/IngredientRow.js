const RemoveElementHandler = require('./RemoveElementHandler');

async function IngredientRow(recipeIngredient, index) {
  const URL = 'http://localhost:3000/ingredients';
  const response = await fetch(URL);
  const ingredients = await response.json();
  const ingredientsMap = new Map(ingredients.map((ingredient) => [ingredient.name, ingredient.id]));

  const ingredientListItem = document.createElement('li');
  ingredientListItem.classList.add('form-ingredient');
  const deleteId = `ingredient${index}`;
  ingredientListItem.classList.add(deleteId);

  const selectDiv1 = document.createElement('div');
  selectDiv1.classList.add('select');

  const selectOptions1 = document.createElement('ul');
  selectOptions1.classList.add('select-options');

  const selectValue1 = document.createElement('div');
  selectValue1.classList.add('select-value');
  selectValue1.textContent = ingredients[0].name;
  selectValue1.setAttribute('data-id', ingredients[0].id);
  if (recipeIngredient) {
    selectValue1.textContent = recipeIngredient.name;
    selectValue1.setAttribute('data-id', recipeIngredient.ingredientId);
    selectValue1.classList.add('touched');
  }

  ingredients.forEach((ingredient) => {
    const ingredientOption = document.createElement('li');
    ingredientOption.classList.add('select-option');
    ingredientOption.textContent = ingredient.name;

    ingredientOption.addEventListener('click', (event) => {
      const previousSelected = selectOptions1.querySelector('.selected');
      if (previousSelected) {
        previousSelected.classList.remove('selected');
      }
      event.target.classList.add('selected');
      selectValue1.textContent = event.target.textContent;
      selectValue1.dataset.id = ingredientsMap.get(event.target.textContent);
      if (!selectValue1.classList.contains('touched')) {
        selectValue1.classList.add('touched');
      }
    });

    if (recipeIngredient) {
      if (ingredient.name === recipeIngredient.name) {
        ingredientOption.classList.add('selected');
      }
    }
    selectOptions1.append(ingredientOption);
  });

  selectDiv1.append(selectOptions1);
  selectDiv1.append(selectValue1);

  const formBlockDiv = document.createElement('div');
  formBlockDiv.classList.add('form-block');

  const ingredientQuantityInput = document.createElement('input');
  ingredientQuantityInput.classList.add('input', 'input-ingredient');
  ingredientQuantityInput.setAttribute('required', 'true');
  if (recipeIngredient) {
    ingredientQuantityInput.value = recipeIngredient.amount;
  }

  const selectDiv2 = document.createElement('div');
  selectDiv2.classList.add('select', 'select-measure');

  const selectOptions2 = document.createElement('ul');
  selectOptions2.classList.add('select-options');

  const unitOption1 = document.createElement('li');
  unitOption1.classList.add('select-option', 'selected');
  unitOption1.textContent = 'kg';
  unitOption1.setAttribute('data-type', 'kg');

  const unitOption2 = document.createElement('li');
  unitOption2.classList.add('select-option');
  unitOption2.textContent = 'tb';
  unitOption2.setAttribute('data-type', 'tablespoon');

  const unitOption3 = document.createElement('li');
  unitOption3.classList.add('select-option');
  unitOption3.textContent = 'cup';
  unitOption3.setAttribute('data-type', 'cup');

  const unitOption4 = document.createElement('li');
  unitOption4.classList.add('select-option');
  unitOption4.textContent = 'pc';
  unitOption4.setAttribute('data-type', 'piece');

  const unitOption5 = document.createElement('li');
  unitOption5.classList.add('select-option');
  unitOption5.textContent = 'ounce';
  unitOption5.setAttribute('data-type', 'ounce');

  const unitOption6 = document.createElement('li');
  unitOption6.classList.add('select-option');
  unitOption6.textContent = 'pound';
  unitOption6.setAttribute('data-type', 'pound');

  const selectValue2 = document.createElement('div');
  selectValue2.classList.add('select-value');
  selectValue2.textContent = 'Kg';

  selectOptions2.append(unitOption1);
  selectOptions2.append(unitOption2);
  selectOptions2.append(unitOption3);
  selectOptions2.append(unitOption4);
  selectOptions2.append(unitOption5);
  selectOptions2.append(unitOption6);

  const selectOptions2Array = [unitOption1, unitOption2, unitOption3, unitOption4, unitOption5, unitOption6];

  if (recipeIngredient) {
    selectOptions2Array.forEach((item) => {
      if (recipeIngredient.amountType === item.dataset.type) {
        item.classList.add('selected');
        selectValue2.textContent = item.textContent;
        selectValue2.classList.add('touched');
      }
    });
  }

  selectOptions2Array.forEach((item) => {
    item.addEventListener('click', (event) => {
      const previousSelected = selectOptions2.querySelector('.selected');
      if (previousSelected) {
        previousSelected.classList.remove('selected');
      }
      event.target.classList.add('selected');
      selectValue2.textContent = event.target.textContent;
      if (!selectValue2.classList.contains('touched')) {
        selectValue2.classList.add('touched');
      }
    });
  });

  selectDiv2.append(selectOptions2);
  selectDiv2.append(selectValue2);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button', 'form-delBtn', 'btn-del');

  formBlockDiv.append(ingredientQuantityInput);
  formBlockDiv.append(selectDiv2);
  formBlockDiv.append(deleteButton);

  ingredientListItem.append(selectDiv1);
  ingredientListItem.append(formBlockDiv);

  selectDiv1.addEventListener('click', () => {
    selectDiv1.classList.toggle('open');
  });

  selectDiv2.addEventListener('click', () => {
    selectDiv2.classList.toggle('open');
  });

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    RemoveElementHandler(`.${deleteId}`);
  });

  const ingredientsList = document.querySelector('.form-ingredients');
  ingredientsList.append(ingredientListItem);
}

module.exports = IngredientRow;
