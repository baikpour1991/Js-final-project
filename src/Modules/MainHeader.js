const AddEditDataForm = require('./AddEditDataForm');

function MainHeader(page) {
  const main = document.querySelector('.main');
  const header = document.createElement('div');
  header.classList.add('main-header');
  header.innerHTML = '';
  const heading = document.createElement('h1');
  if (page === 'all') {
    heading.innerHTML = 'recipes';
    const addBtn = document.createElement('button');
    addBtn.classList.add('addBtn');
    addBtn.innerHTML = '+ add new recipe';
    header.append(heading);
    header.append(addBtn);

    addBtn.addEventListener('click', () => {
      AddEditDataForm('ADD');
    });
  } else if (page === 'fav') {
    heading.innerHTML = 'favorite recipes';
    header.append(heading);
  }
  main.append(header);
}

module.exports = MainHeader;
