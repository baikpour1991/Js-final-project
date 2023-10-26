const Main = require('./Main');

function SideBar() {
  // Render aside section
  const aside = document.createElement('aside');
  aside.classList.add('sidebar');

  const sidebarAll = document.createElement('a');
  sidebarAll.classList.add('sidebar-icon', 'sidebar-all', 'active');
  sidebarAll.href = '#';

  const sidebarAllIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sidebarAllIcon.setAttribute('width', '34');
  sidebarAllIcon.setAttribute('height', '34');
  sidebarAllIcon.setAttribute('viewBox', '0 0 34 34');
  sidebarAllIcon.setAttribute('fill', 'none');
  sidebarAllIcon.style.backgroundColor = 'transparent';

  const sidebarAllPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  sidebarAllPath.setAttribute('id', 'Vector');
  sidebarAllPath.setAttribute(
    'd',
    'M9.53071 19.0064L14.5629 13.9741L2.08017 1.50916C0.748054 2.84512 0 4.65476 0 6.54138C0 8.428 0.748054 10.2376 2.08017 11.5736L9.53071 19.0064ZM21.5867 15.7879C24.3073 17.0504 28.1304 16.1613 30.9577 13.334C34.354 9.93769 35.0119 5.0655 32.398 2.45159C29.8019 -0.144544 24.9297 0.495598 21.5156 3.89191C18.6883 6.7192 17.7992 10.5423 19.0617 13.2629L1.70676 30.6178L4.21398 33.1251L16.4656 20.909L28.6994 33.1428L31.2066 30.6356L18.9728 18.4018L21.5867 15.7879Z'
  );
  sidebarAllPath.setAttribute('fill', '#EBC060');
  sidebarAllIcon.appendChild(sidebarAllPath);

  const sidebarFav = document.createElement('a');
  sidebarFav.classList.add('sidebar-icon', 'sidebar-fav');
  sidebarFav.href = '#';

  const sideBarFavIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sideBarFavIcon.setAttribute('width', '26');
  sideBarFavIcon.setAttribute('height', '34');
  sideBarFavIcon.setAttribute('viewBox', '0 0 26 34');
  sideBarFavIcon.setAttribute('fill', 'none');
  sideBarFavIcon.style.backgroundColor = 'transparent';

  const sideBarFavPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  sideBarFavPath.setAttribute(
    'd',
    'M25.0671 34V3.44775C25.0671 2.53335 24.7039 1.6564 24.0573 1.00982C23.4107 0.363244 22.5338 0 21.6194 0H4.38062C3.46622 0 2.58927 0.363244 1.94269 1.00982C1.29611 1.6564 0.932869 2.53335 0.932869 3.44775V34L13 26.1202L25.0671 34ZM6.1045 10.3433L10.7021 9.7692L13 5.17163L15.2979 9.7692L19.8955 10.3433L16.0633 13.5997L17.5976 18.9626L13 15.8976L8.40242 18.9626L9.93667 13.5997L6.1045 10.3433Z'
  );
  sideBarFavPath.setAttribute('fill', '#EBC060');
  sideBarFavIcon.appendChild(sideBarFavPath);

  sidebarAll.append(sidebarAllIcon);
  sidebarFav.append(sideBarFavIcon);

  aside.append(sidebarAll);
  aside.append(sidebarFav);

  const root = document.querySelector('#root');
  root.append(aside);

  // Add event listener for sidebar links

  sidebarAll.addEventListener('click', (e) => {
    e.preventDefault();
    sidebarFav.classList.remove('active');
    sidebarAll.classList.add('active');
    Main('all');
  });

  sidebarFav.addEventListener('click', (e) => {
    e.preventDefault();
    sidebarAll.classList.remove('active');
    sidebarFav.classList.add('active');
    Main('fav');
  });
}

module.exports = SideBar;
