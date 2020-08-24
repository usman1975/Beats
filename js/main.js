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


const findBlockByAlias = (alias) => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  });
};

  $(".ineractive-avatar-link").click((e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);``
    const curItem = $this.closest(".reviews__switcher-item");
    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("ineractive-avatar-active").siblings().removeClass("ineractive-avatar-active");
  })