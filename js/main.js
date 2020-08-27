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

const openItem = item => {
    const container = item.closest('.team__item');
    const contentBlock = container.find('.team__content');
    const textBlock = contentBlock.find('.team__content-block');
    const regHeight = textBlock.height();
    container.addClass('active');
    contentBlock.height(regHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');
    itemContainer.removeClass('active');
    items.height(0);
}

  $('.team__title').click(e =>{
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass("active")) {
      closeEveryItem(container);
    } else {
      closeEveryItem(container);
      openItem($this);
    } 
  })

  const slider = $('.slider__list').bxSlider({
    pager: false,
    controls: false
  });

  $('.slider__arrow-left').click((e) => {
    e.preventDefault();
    slider.goToPrevSlide();
  });

  $('.slider__arrow-right').click((e) => {
    e.preventDefault();
    slider.goToNextSlide();
  });

$('.form').submit(e => {
  e.preventDefault();
  $.fancybox.open({
    src: "#modal",
    type: "inline"
  })
});
