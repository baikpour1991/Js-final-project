const RemoveDataFromDatabase = require('./RemoveDataFromDatabase');
const RemoveElementHandler = require('./RemoveElementHandler');

function RemoveDataForm(id, targetPage) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'delete-overlay');

  const popup = document.createElement('div');
  popup.classList.add('popup', 'delete');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('closeBtn', 'delete-closeBtn');

  const header = document.createElement('span');
  header.classList.add('delete-header');
  header.innerHTML = 'confirmation';

  const text = document.createElement('span');
  text.classList.add('delete-text');
  text.innerHTML = 'Are you sure you want to delete this recipe?';

  const buttons = document.createElement('div');
  buttons.classList.add('buttons', 'delete-buttons');

  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('delete-button', 'btn-cancel');
  cancelBtn.innerHTML = 'cancel';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-button', 'btn-delete');
  deleteBtn.innerHTML = 'yes, delete';

  buttons.append(cancelBtn);
  buttons.append(deleteBtn);

  popup.append(closeBtn);
  popup.append(header);
  popup.append(text);
  popup.append(buttons);

  overlay.append(popup);

  //        ADD Event Listener

  closeBtn.addEventListener('click', () => {
    RemoveElementHandler('.delete-overlay');
  });

  cancelBtn.addEventListener('click', () => {
    RemoveElementHandler('.delete-overlay');
  });

  popup.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  overlay.addEventListener('click', () => {
    RemoveElementHandler('.delete-overlay');
  });

  deleteBtn.addEventListener('click', () => {
    RemoveDataFromDatabase(id, targetPage);
  });

  const main = document.querySelector('.main');
  main.append(overlay);
}

module.exports = RemoveDataForm;
