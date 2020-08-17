const openingBtn = document.querySelector(".hamburger");
const closingBtn = document.querySelector(".mobal-menu__close");
const mobalMenu = document.querySelector(".mobal-menu--wrapper");

openingBtn.addEventListener("click", e => {
    e.preventDefault();
    mobalMenu.classList.add("mobal-menu--opened");
  });

  closingBtn.addEventListener("click",  e => {
    e.preventDefault();  
    mobalMenu.classList.remove("mobal-menu--opened");
  });
