"use strict";

export function showWelcomeImage() {
  window.addEventListener("load", function () {
    const welcomeImage = document.querySelector(".welcome");
    welcomeImage.style.display = "block";
  
    setTimeout(function () {
      welcomeImage.style.transform = "translateY(-100%)";
    }, 2000);
  });
}