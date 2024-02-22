'use strict';

// === size menu start ===
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
// === size menu end ===

// === open menu start ===
const openMenu = document.querySelector('#menuOpen');
const menuActive = document.querySelector('.menuActive');
const closeMenu = document.querySelector('#close');
openMenu.addEventListener('click', function() {
  menuActive.style.transform = 'translateX(0)';
});
closeMenu.addEventListener('click', function() {
  menuActive.style.transform = 'translateX(-200%)';
});

// === open menu end === 

// === welcome image start === 
window.addEventListener('load', function() {
  const welcomeImage = document.querySelector('.welcome');
  welcomeImage.style.display = 'block';
  
  setTimeout(function() {
    welcomeImage.style.transform = 'translateY(-100%)';
  }, 3000); 
});

// === welcome image end === 
