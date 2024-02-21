'use strict';

window.addEventListener('load', setMenuWidth);
window.addEventListener('resize', setMenuWidth);

function setMenuWidth() {
  const container = document.querySelector('.container');
  const menu = document.querySelector('.menu');
  const menuOpen = document.querySelector('.menuOpen');

  if (container && menu) {
    const containerWidth = container.offsetWidth - 50;
    menu.style.width = `${containerWidth}px`;
    menuOpen.style.width = `${containerWidth}px`;
  }
}

const openMenu = document.querySelector('#menuOpen');
const menuActive = document.querySelector('.menuActive');
const closeMenu = document.querySelector('#close');
openMenu.addEventListener('click', function() {
  menuActive.style.transform = 'translateX(0)';
});
closeMenu.addEventListener('click', function() {
  menuActive.style.transform = 'translateX(-200%)';
});