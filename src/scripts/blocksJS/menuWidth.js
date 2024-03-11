"use strict";

  export function setMenuWidth() {
    const container = document.querySelector(".container");
    const menu = document.querySelector(".menu");
    const menuOpen = document.querySelector(".menuOpen");
  
    if (container && menu) {
      const containerWidth = container.offsetWidth - 50;
      menu.style.width = `${containerWidth}px`;
      menuOpen.style.width = `${containerWidth}px`;
    };
  };