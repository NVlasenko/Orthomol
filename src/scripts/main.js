'use strict';

window.addEventListener('load', setMenuWidth);
window.addEventListener('resize', setMenuWidth);

function setMenuWidth() {
  const container = document.querySelector('.container');
  const menu = document.querySelector('.menu');

  if (container && menu) {
    const containerWidth = container.offsetWidth - 120;
    menu.style.width = `${containerWidth}px`;
  }
}