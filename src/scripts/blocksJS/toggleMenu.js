"use strict";

export function toggleMenu(){
  const openMenu = document.querySelector("#menuOpen");
  const menuActive = document.querySelector(".menuActive");
  const menu = document.querySelector(".menu");
  const closeMenu = document.querySelector("#close");

  openMenu.addEventListener("click", function () {
    menuActive.style.transform = "translateX(0)";
    menu.style.display = "none";
    disableScroll();
  });
  
  closeMenu.addEventListener("click", function () {
    menuActive.style.transform = "translateX(-100%)";
    enableScroll();
    menu.style.display = "block";
  });

  function disableScroll() {
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
  }

  function enableScroll() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    const scrollY = parseInt(document.body.style.top || "0");

    document.body.style.position = "";
    document.body.style.top = "";

    window.scrollTo(0, scrollY);
  }
}