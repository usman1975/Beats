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

//отправка формы

const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach(field => {
    field.removeClass('input-error');
    if (field.val().trim() === "") {
      field.addClass('input-error');
    }
  })

const errorFields = form.find(".input-error");

   return  errorFields.length === 0;
}

$('.form').submit(e => {
  e.preventDefault();
   
  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const modal = $("#modal");
  const content = modal.find(".modal__content");
  

  modal.removeClass("error-modal");
  const isValid = validateFields(form, [name, phone, comment, to]);
  
if (isValid) {
  $.ajax({
    url: "https://webdev-api.loftschool.com/sendmail",
    method: "POST",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val()
    },
    success: data => {
      content.text(data.message);
      console.log(data);
      $.fancybox.open({
        src: "#modal",
        type: "inline"
      });
    },

    error: data => {
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
      
      $.fancybox.open({
        src: "#modal",
        type: "inline"
      });
    }
  });
}
});



$(".app-close-modal").click(e => {
  e.preventDefault();
  $.fancybox.close();
})


//подключение яндекс карты

let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.753215, 37.622504],
      zoom: 13,
      controls: []
    });

    let coords = [
      [55.760270, 37.581850],
      [55.76027, 37.647147],
      [55.746258, 37.585098],
      [55.750412, 37.602934],
    ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.svg',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52]
    });
  
  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  
  myMap.geoObjects.add(myCollection);
  
  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);


//ops

const sections = $("section");
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active");

const performTransition = sectionEq => {

  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;

    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const sideMenu = $(".fixed-menu ");

    if (menuTheme === "black") {
      sideMenu.addClass("fixed-menu--shadowed");
    } else {
      sideMenu.removeClass("fixed-menu--shadowed");
    }


    display.css({
      transform: `translateY(${position}%)`
    });
  
    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
   

    setTimeout( () => {
      inScroll = false;
      sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
    }, 1300 );
  }
 
};

const scrollViewport = direction => {

  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};



$(window).on("wheel", e =>  {
  const deltaY = e.originalEvent.deltaY;
  if (deltaY > 0) {
    scrollViewport("next");
  };
  if (deltaY < 0) {
    scrollViewport("prev");
  };
});

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
   console.log(e.keyCode);
   if (tagName !== "input" && tagName !== "textarea") {
    switch(e.keyCode) {
      case 38:
        scrollViewport("prev");
        break;
      case 40:
       scrollViewport("next");
       break; 
    }
   }
  
})

//links

$("[data-scroll-to]").click(e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  console.log(target);
  const regSection = $(`[data-section-id=${target}]`);
  console.log(regSection.index());
  if (regSection.index() !== 0 && regSection.index() !== 9) {
    performTransition(regSection.index());
  } else if(regSection.index() == 9) {
    performTransition(8);
  } else {
    performTransition(0);
  }

})

//swipe
$("body").swipe( {
  swipe:function(
    event,
    direction 
    ) {
    const scroller = viewportScroller();
    let scrollDirection = "";
    if (direction === "up") scrollDirection = "next";
    if (direction === "down") scrollDirection = "prev";
    scroller[scrollDirection]();
     }
});