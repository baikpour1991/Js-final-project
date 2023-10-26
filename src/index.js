import './index.css';

const SideBar = require('./Modules/SideBar');
const Main = require('./Modules/Main');

window.onload = () => {
  SideBar();

  const root = document.querySelector('#root');
  const main = document.createElement('div');
  main.classList.add('main');
  root.append(main);

  Main('all');
};
