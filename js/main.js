"use strict"
//------------------------------------------------------------------------Готовые блоки кода

//------------------------------------------------------------------------preloader
//document.body.onload = () => {
//  setTimeout(() => {
//    let preloader = document.getElementById('preloader');
//    if (!preloader.classList.contains('done')) {
//      preloader.classList.add('done');
//    }
//  }, 1000);
//}
//------------------------------------------------------------------------preloader


//------------------------------------------------------------------------разворот тегов
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.toggle-btn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const tags = document.querySelector('.tags');
      if (!tags) return; // Если .tags нет на странице, выходим

      tags.classList.toggle('collapsed');
      this.innerHTML = tags.classList.contains('collapsed')
        ? 'Развернуть весь список <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="#171717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : 'Свернуть <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 15l6-6 6 6" stroke="#171717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
  }
});

//----------------------------------------------------------------------ползунки для фильтра
document.addEventListener("DOMContentLoaded", function () {
  function initializeSlider(sliderId, minInputId, maxInputId, startValues, range) {
      let slider = document.getElementById(sliderId);
      let minInput = document.getElementById(minInputId);
      let maxInput = document.getElementById(maxInputId);

      if (slider && minInput && maxInput) {
          noUiSlider.create(slider, {
              start: startValues, // Начальные значения
              connect: true,
              range: range,
              step: 1,
              format: {
                  to: value => Math.round(value),
                  from: value => Number(value)
              }
          });
          
          // Устанавливаем начальные значения в input
          minInput.value = startValues[0];
          maxInput.value = startValues[1];

          // Обновление input при изменении ползунка
          slider.noUiSlider.on('update', function (values, handle) {
              if (handle === 0 && document.activeElement !== minInput) {
                  minInput.value = values[0];
              }
              if (handle === 1 && document.activeElement !== maxInput) {
                  maxInput.value = values[1];
              }
          });

          // Обновление ползунка при вводе значений вручную
          minInput.addEventListener('change', function () {
              slider.noUiSlider.set([this.value || range.min, null]);
          });

          maxInput.addEventListener('change', function () {
              slider.noUiSlider.set([null, this.value || range.max]);
          });
      }
  }

  // Инициализация одного слайдера
  initializeSlider('slider1', 'minInput1', 'maxInput1', [380, 3450], {'min': 1, 'max': 4000});
});

//----------------------------------------------------------------------ползунки для фильтра

//------------------------------------------------------------------------разворот тегов



//------------------------------------------------------------------------таймер обратного отсчета
//const startDays = 2; // Количество дней
//const startHours = 5; // Количество часов
//const startMinutes = 10; // Количество минут
//const startSeconds = 0; // Количество секунд
//
//// Переводим все в секунды
//let time = startDays * 24 * 60 * 60 + startHours * 60 * 60 + startMinutes * 60 + startSeconds;
//
//const countdownElement = document.getElementById('countdown');
//
//function updateCountdown() {
//    const days = Math.floor(time / (24 * 60 * 60)); // Количество дней
//    const hours = Math.floor((time % (24 * 60 * 60)) / 3600); // Количество часов
//    const minutes = Math.floor((time % 3600) / 60); // Количество минут
//    const seconds = time % 60; // Количество секунд
//
//    // Форматируем время
//    countdownElement.innerText = `${days}:${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//
//    if (time > 0) {
//        time--;
//    } else {
//        clearInterval(timer);
//        countdownElement.innerText = "Время вышло!";
//    }
//}
//
//const timer = setInterval(updateCountdown, 1000);
//------------------------------------------------------------------------таймер обратного отсчета


//------------------------------------------------------------------------search
//const searchButtons = document.querySelectorAll('.search__btn');
//const searchWindows = document.querySelectorAll('.search__window');
//
//searchButtons.forEach((searchBtn, index) => {
//  const searchWindow = searchWindows[index]; // Привязываем соответствующее окно к каждой кнопке
//
//  searchBtn.addEventListener("click", function (e) {
//    e.stopPropagation();
//    searchWindow.classList.toggle('_act'); // Открываем/закрываем конкретное окно поиска
//  });
//
//  document.addEventListener("click", function (e) {
//    if (!searchBtn.contains(e.target) && !searchWindow.contains(e.target)) {
//      searchWindow.classList.remove('_act'); // Закрываем окно, если клик вне кнопки или окна
//    }
//  });
//});

//------------------------------------------------------------------------search

//------------------------------------------------------------------------код для прилипания блока в Price
document.addEventListener("DOMContentLoaded", function () {
  const priceLinks = document.querySelector(".price__links");

  // Проверяем, существует ли нужный элемент на странице
  if (!priceLinks) return;

  const links = document.querySelectorAll('a[href^="#"]');
  let stickyOffset = priceLinks.offsetTop;

  // Функция для получения полной высоты блока с учетом margin
  function getFullHeight(element) {
    const styles = window.getComputedStyle(element);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    return element.offsetHeight + marginTop + marginBottom;
  }

  // Обработчик скролла для фиксации блока
  window.addEventListener("scroll", function () {
    if (window.scrollY >= stickyOffset) {
      if (!priceLinks.classList.contains("fixed")) {
        priceLinks.classList.add("fixed");
      }
    } else {
      priceLinks.classList.remove("fixed");
    }
  });

  // Обработчик клика по якорным ссылкам
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        // Получаем точную высоту priceLinks с учетом margin
        const fixedHeight = priceLinks.classList.contains("fixed") ? getFullHeight(priceLinks) : 0;

        window.scrollTo({
          top: target.offsetTop - fixedHeight,
          behavior: "smooth"
        });
      }
    });
  });
});

//------------------------------------------------------------------------код для прилипания блока в Price

//------------------------------------------------------------------------Меню-Бургер
const burgerMenu = document.querySelector('.burger__wrapper');
const menuBody= document.querySelector('.menu');

if(burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      burgerMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".menu__btn").forEach(btn => {
      btn.addEventListener("click", function () {
          const dropdown = this.querySelector(".menu__dropdown-submenu");
          if (dropdown) {
              dropdown.classList.toggle("open-submenu");
          }
      });
  });
});

//------------------------------------------------------------------------Прокрутка при клике
//let buttons = document.querySelectorAll('.menu__link');
//
//buttons.forEach((elem)=>{
//  elem.addEventListener('click',()=>{
//    menuBody.classList.remove('_active');
//    burgerMenu.classList.remove('_active');
//  })
//})
//
//const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//
//if (menuLinks.length > 0) {
//  menuLinks.forEach(menuLink => {
//    menuLink.addEventListener("click", onMenuLinkClick);
//  });
//  function onMenuLinkClick(e) {
//    const menuLink = e.target;
//    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//        const gotoBlock = document.querySelector(menuLink.dataset.goto);
//        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
//      
//        window.scrollTo({
//        top:gotoBlockValue,
//        behavior: "smooth"
//      });
//      e.preventDefault();
//    }
//  }
//}
//------------------------------------------------------------------------Прокрутка при клике

//------------------------------------------------------------------------Слайдер
const mainSliders = document.querySelectorAll('.main-slider');
mainSliders.forEach((slider) => {
  new Swiper(slider, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 1000,
    autoHeight: false,
    pagination: {
      el: slider.querySelector('.swiper-pagination'),
      clickable: true,
    },
  });
});

const categoriesSliders = document.querySelectorAll('.categories-slider');
categoriesSliders.forEach((slider, index) => {
  new Swiper(slider, {
    direction: 'horizontal',
    spaceBetween: 20,
    speed: 1000,
    autoHeight: false,
    loop: true,
    navigation: {
      nextEl: `.swiper-button-next-${index}`,
      prevEl: `.swiper-button-prev-${index}`,
    },
    breakpoints: {
      320: {
        slidesPerView: 2, 
        spaceBetween: 10,  
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  });
});
const cesSliders = document.querySelectorAll('.sec-slider');
cesSliders.forEach((slider, index) => {
  new Swiper(slider, {
    direction: 'horizontal',
    spaceBetween: 40,
    speed: 1000,
    autoHeight: false,
    loop: true,
    navigation: {
      nextEl: `.swiper-button-next-${index}`,
      prevEl: `.swiper-button-prev-${index}`,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.8, 
        spaceBetween: 10,  
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 30,  
      },
    }
  });
});
const partnersSlider = document.querySelector('.partners-slider');
if (partnersSlider) {
  new Swiper(partnersSlider, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    speed: 2000,
    autoHeight: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-prev',
      prevEl: '.swiper-button-next',
    },
  });
}
const lastArticleSslider = document.querySelector('.last-article-slider');
if (lastArticleSslider) {
  new Swiper(lastArticleSslider, {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 10,
    speed: 1000,
    autoHeight: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1, 
        spaceBetween: 10,  
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }
  });
}
const ratingSlider = document.querySelector('.rating-slider');
if (ratingSlider) {
  new Swiper(ratingSlider, {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 10,
    speed: 1000,
    autoHeight: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1, 
        spaceBetween: 10,  
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  });
}
const feedbackSlider = document.querySelector('.feedback-slider');
if (feedbackSlider) {
  new Swiper(feedbackSlider, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    speed: 2000,
    autoHeight: false,
    navigation: {
      nextEl: '.swiper-button-prev-feedback',
      prevEl: '.swiper-button-next-feedback',
    },
  });
}
//------------------------------------------------------------------------Слайдер


//-----------------------------------------------------------------------код для кнопок показать скрыть текст
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 768) { // Проверка на мобильное устройство
      const moreButton = document.querySelector(".button__more");
      const hideButton = document.querySelector(".button__hide");
      const textMore = document.querySelector(".text-more");

      if (moreButton && hideButton && textMore) {
          moreButton.addEventListener("click", function () {
              textMore.style.display = "block";
              moreButton.style.display = "none";
              hideButton.style.display = "block";
          });

          hideButton.addEventListener("click", function () {
              textMore.style.display = "none";
              moreButton.style.display = "block";
              hideButton.style.display = "none";
          });

          hideButton.style.display = "none";
      }
  }
});
//-----------------------------------------------------------------------код для кнопок показать скрыть текст
document.addEventListener("DOMContentLoaded", function () {
      const accountMoreButton = document.querySelector(".account__button-more");
      const accountMoreContent = document.querySelector(".account__content-more");

      if (accountMoreButton && accountMoreContent) {
        accountMoreButton.addEventListener("click", function () {
          accountMoreContent.style.display = "block";
          accountMoreButton.style.display = "none";
          });

      }
  
});
document.addEventListener("DOMContentLoaded", function () {
  const buttonsFilter = document.querySelectorAll(".account__top-icon"); // Все кнопки
  const accountFilters = document.querySelectorAll(".account__filter-mob"); // Все фильтры

  if (buttonsFilter.length && accountFilters.length) {
    buttonsFilter.forEach((button, index) => {
      button.addEventListener("click", function () {
        // Переключаем класс "block" для соответствующего фильтра
        accountFilters[index].classList.toggle("open-filter");
      });
    });
  }
});


//-----------------------------------------------------------------------код для загрузки файлов в форме
document.addEventListener("DOMContentLoaded", function() {
  const fileInput = document.getElementById("fileInput");
  
  // Проверяем, существует ли элемент
  if (fileInput) {
    fileInput.addEventListener("change", function() {
      const fileName = this.files.length > 0 ? this.files[0].name : "Файл не выбран";
      document.getElementById("fileName").textContent = fileName;
    });
  }
});

//-----------------------------------------------------------------------код для загрузки файлов в форме

//------------------------------------------------------------------------Fancybox
document.addEventListener("DOMContentLoaded", function () {
  if (typeof Fancybox !== "undefined" && typeof Fancybox.bind === "function") {
      Fancybox.bind("[data-fancybox]", {
          // Кастомные опции
      });
  }
});
//------------------------------------------------------------------------Fancybox

//------------------------------------------------------------------------выбор городов в шапке сайта
const places = document.querySelectorAll('.header__place');  
const btnYesList = document.querySelectorAll('.header__place-btn--yes');
const btnAnother = document.querySelectorAll('.header__place-btn--another');
const cities = document.querySelectorAll('.cities');
const cityList = document.querySelectorAll('.cities__block span');
const placesLocation = document.querySelectorAll('.header__locations-place');

document.addEventListener("DOMContentLoaded", function () {
  btnYesList.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      if (places[index]) {
        places[index].style.display = "none";
      }
    });
  });

  btnAnother.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      if (cities[index]) {
        cities[index].classList.add("show");
      }
    });
  });

  placesLocation.forEach((location, index) => {
    location.addEventListener('click', function () {
      if (cities[index]) {
        cities[index].classList.add("show"); // Открываем список городов
      }
    });
  });

  cityList.forEach(city => {
    city.addEventListener('click', function () {
      const cityName = this.textContent.trim(); // Получаем название города

      placesLocation.forEach(location => {
        location.textContent = cityName; // Устанавливаем название в placesLocation
      });

      cities.forEach(cityBlock => {
        cityBlock.classList.remove("show"); // Закрываем список городов
      });

      places.forEach(place => {
        place.style.display = "none"; // Закрываем places
      });
    });
  });
});

//------------------------------------------------------------------------выбор городов в шапке сайта


//------------------------------------------------------------------------код для работы accordion
  document.addEventListener("DOMContentLoaded", function () {
    const detailsList = document.querySelectorAll(".accordion__details");

    function updateDetailsState() {
      const isMobile = window.innerWidth < 768;

      detailsList.forEach(details => {
        if (isMobile) {
          details.removeAttribute("open");
        }
      });
    }
    // Убираем `open` при загрузке страницы на мобильных устройствах
    updateDetailsState();

    // Добавляем клик-обработчик для открытия/закрытия на мобильных устройствах
    detailsList.forEach(details => {
      details.addEventListener("click", function (event) {
        if (window.innerWidth < 768) {
          event.preventDefault(); // Отключаем стандартное поведение
          details.toggleAttribute("open"); // Переключаем `open`
        }
      });
    });

    // Обновляем при изменении размера экрана (например, если повернуть телефон)
    window.addEventListener("resize", updateDetailsState);
  });
//------------------------------------------------------------------------код для работы accordion





//------------------------------------------------------------------------select выпадающий список
//document.querySelectorAll('.dropdown').forEach(function(dropDownWrapper) {
//  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
//  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
//  const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
//  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
//
//  // Функция для закрытия текущего дропдауна
//  function closeCurrentDropdown() {
//    dropDownList.classList.remove('dropdown__list--active');
//    dropDownBtn.classList.remove('dropdown__button--active');
//  }
//
//  // Открыть/закрыть текущий дропдаун
//  dropDownBtn.addEventListener('click', function (e) {
//    e.stopPropagation(); // Остановить всплытие события
//    e.preventDefault(); // Предотвращаем отправку формы
//    const isActive = dropDownList.classList.contains('dropdown__list--active');
//
//    // Закрываем все дропдауны перед открытием текущего
//    document.querySelectorAll('.dropdown__list--active').forEach(function(activeList) {
//      activeList.classList.remove('dropdown__list--active');
//    });
//    document.querySelectorAll('.dropdown__button--active').forEach(function(activeButton) {
//      activeButton.classList.remove('dropdown__button--active');
//    });
//
//    // Если текущий дропдаун не был активным, открываем его
//    if (!isActive) {
//      dropDownList.classList.add('dropdown__list--active');
//      dropDownBtn.classList.add('dropdown__button--active');
//    }
//  });
//
//  // Выбор элемента списка
//  dropDownListItems.forEach(function (listItem) {
//    listItem.addEventListener('click', function (e) {
//      e.stopPropagation(); // Остановить всплытие события
//      e.preventDefault(); // Предотвращаем отправку формы
//      dropDownBtn.innerText = this.innerText;
//      dropDownBtn.focus();
//      dropDownInput.value = this.dataset.value;
//      closeCurrentDropdown(); // Закрываем текущий дропдаун после выбора
//    });
//  });
//
//  // Закрытие при клике снаружи
//  document.addEventListener('click', function (e) {
//    if (!dropDownWrapper.contains(e.target)) {
//      closeCurrentDropdown(); // Закрываем только текущий дропдаун
//    }
//  });
//
//  // Закрытие при нажатии Tab или Escape
//  document.addEventListener('keydown', function (e) {
//    if (e.key === 'Tab' || e.key === 'Escape') {
//      closeCurrentDropdown(); // Закрываем только текущий дропдаун
//    }
//  });
//});
//
//// Инициализация кнопки после загрузки
//function initMyButton() {
//  const myButton = document.getElementById('myButton');
//  
//  if (myButton && myButton.style.display !== 'none') {
//    myButton.addEventListener('click', function(event) {
//      event.preventDefault();
//    });
//  }
//}
//window.onload = initMyButton;

//------------------------------------------------------------------------select выпадающий список


//------------------------------------------------------------------------popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");


let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock () {
  setTimeout(function () {
    if(lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
  }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});
//------------------------------------------------------------------------popup


//------------------------------------------------------------------------фильтрация по атрибутам
document.addEventListener("DOMContentLoaded", function () {
  const filterItems = document.querySelectorAll(".filter-menu__list li");
  const posts = document.querySelectorAll(".filter-menu__container .post");

  filterItems.forEach(item => {
      item.addEventListener("click", function () {
          const filter = this.getAttribute("data-filter");
          
          // Удаляем активный класс у всех элементов
          filterItems.forEach(i => i.classList.remove("active"));
          this.classList.add("active");

          // Скрываем все посты
          posts.forEach(post => {
              if (post.classList.contains(filter)) {
                  post.style.display = "block";
              } else {
                  post.style.display = "none";
              }
          });
      });
  });

  // По умолчанию показываем первый элемент
  if (filterItems.length > 0) {
      filterItems[0].click();
  }
});
//------------------------------------------------------------------------фильтрация по атрибутам



//------------------------------------------------------------------------Animation
//const animItems = document.querySelectorAll('._anim-items');
//if (animItems.length > 0) {
//  window.addEventListener('scroll', animOnScroll);
//  function animOnScroll() {
//    for (let index = 0; index < animItems.length; index++) {
//        const animItem = animItems[index];
//        const animItemHeight = animItem.offsetHeight;
//        const animItemOffset = offset(animItem).top;
//        const animStart = 5;
//
//        let animItemPoint = window.innerHeight - animItemHeight / animStart;
//
//        if (animItemHeight > window.innerHeight) {
//          animItemPoint = window.innerHeight - window.innerHeight / animStart;
//        }
//
//        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
//          animItem.classList.add('_action');
//        } else {
//          animItem.classList.remove('_action');
//        }
//    }
//  }
//  function offset(el) {
//    const rect = el.getBoundingClientRect(),
//    scrollLeft  = window.pageXOffset || document.documentElement.scrollLeft,
//    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//    return {top: rect.top + scrollTop, left: rect.left + screenLeft}
//  }
//  animOnScroll();
//}
//------------------------------------------------------------------------Animation

//------------------------------------------------------------------------Обработка формы
//document.addEventListener('DOMContentLoaded', function () {
//  const forms = document.querySelectorAll('form'); // Получаем все формы на странице
//
//  forms.forEach((form) => {
//    const phoneInput = form.querySelector('._number'); // Поле ввода телефона
//
//    // Добавляем маску для номера телефона
//    if (phoneInput) {
//      Inputmask("+7 (999) 999-99-99").mask(phoneInput);
//    }
//
//    form.addEventListener('submit', formSend);
//
//    async function formSend(e) {
//      e.preventDefault();
//
//      let error = formValidate(form);
//      let formData = new FormData(form);
//
//      const formImage = form.querySelector('#formImage');
//      if (formImage && formImage.files[0]) {
//        formData.append('image', formImage.files[0]);
//      }
//
//      if (error === 0) {
//        form.classList.add('_sending');
//        let response = await fetch('send.php', {
//          method: 'POST',
//          body: formData
//        });
//
//      if (response.ok) {
//        let result = await response.json();
//        
//        // Закрытие формы (например, скрытие через класс)
//        form.style.display = 'none';
//        
//        // Добавляем сообщение об успешной отправке
//        const successMessage = document.createElement('div');
//        successMessage.classList.add('success-message'); // Добавляем класс для стилизации
//        successMessage.textContent = 'Форма успешно отправлена! Спасибо за ваш отклик.';
//        form.parentElement.appendChild(successMessage); // Добавляем сообщение в контейнер формы
//        
//        const formPreview = form.querySelector('#formPreview');
//        if (formPreview) {
//          formPreview.innerHTML = '';
//        }
//        form.reset();
//        form.classList.remove('_sending');
//      } else {
//        showErrorMessage('Ошибка при отправке формы');
//        form.classList.remove('_sending');
//      }
//      }
//    }
//
//    function formValidate(form) {
//      let error = 0;
//      let formReq = form.querySelectorAll('._req');
//
//      formReq.forEach((input) => {
//        formRemoveError(input);
//
//        if (input.classList.contains('_email')) {
//          if (!emailTest(input)) { // проверка на корректность email
//            formAddError(input);
//            error++;
//          }
//        } else if (input.classList.contains('_number')) {
//          if (!phoneTest(input)) { // проверка на корректность телефона
//            formAddError(input);
//            error++;
//          }
//        } else if (input.getAttribute('type') === "checkbox" && input.checked === false) {
//          formAddError(input);
//          error++;
//        } else {
//          if (input.value === '') {
//            formAddError(input);
//            error++;
//          }
//        }
//      });
//      return error;
//    }
//
//    function formAddError(input) {
//      input.parentElement.classList.add('_error');
//      input.classList.add('_error');
//    
//      // Ищем элемент с классом form__error внутри контейнера родителя
//      const errorSpan = input.parentElement.querySelector('.form__error');
//      if (errorSpan) {
//        errorSpan.classList.add('view'); // Добавляем класс view
//      }
//    }
//    
//    function formRemoveError(input) {
//      input.parentElement.classList.remove('_error');
//      input.classList.remove('_error');
//    
//      // Ищем элемент с классом form__error внутри контейнера родителя
//      const errorSpan = input.parentElement.querySelector('.form__error');
//      if (errorSpan) {
//        errorSpan.classList.remove('view'); // Удаляем класс view
//      }
//    }
//    
//    // проверка email
//    function emailTest(input) {
//      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input.value);
//    }
//
//    // проверка телефона
//    function phoneTest(input) {
//      return /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(input.value);
//    }
//
//    // Работа с изображением
//    const formImage = form.querySelector('#formImage');
//    const formPreview = form.querySelector('#formPreview');
//
//    if (formImage) {
//      formImage.addEventListener('change', () => {
//        uploadFile(formImage.files[0]);
//      });
//
//      function uploadFile(file) {
//        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//          showErrorMessage('Только изображения');
//          formImage.value = '';
//          return;
//        }
//        if (file.size > 2 * 1024 * 1024) {
//          showErrorMessage('Файл должен быть менее 2 МБ');
//          return;
//        }
//        let reader = new FileReader();
//        reader.onload = function (e) {
//          if (formPreview) {
//            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
//          }
//        };
//        reader.onerror = function (e) {
//          showErrorMessage('Ошибка загрузки изображения');
//        };
//        reader.readAsDataURL(file);
//      }
//    }
//  });
//});
//
//------------------------------------------------------------------------Обработка формы

//-----------------------------------------------------------------------код для работы карзины товаров
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, есть ли на странице ключевые элементы
  const basketProducts = document.querySelector('.basket__products');
  const totalElement = document.querySelector('.product__total span');
  const totalNumberElement = document.querySelector('.product__total-number span');
  const totalWordElement = document.querySelector('.product__total-number p');

  // Если ключевые элементы отсутствуют, завершаем выполнение
  if (!basketProducts || !totalElement || !totalNumberElement || !totalWordElement) {
    return;
  }

  // Остальной код выполняется только если ключевые элементы есть
  const checkboxAll = document.querySelector('.checkbox-all .checkbox__input');
  const deleteAllButton = document.querySelector('.delete-all');

  // Функция для склонения слова "товаров"
  function getCorrectWordForm(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'товаров';
    }
    if (lastDigit === 1) {
      return 'товар';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'товара';
    }
    return 'товаров';
  }

  // Функция для обновления общей суммы и количества товаров
  function updateTotal() {
    let totalCost = 0;
    let totalCount = 0;

    // Считаем общую стоимость и количество товаров
    const productElements = basketProducts.querySelectorAll('.product');
    productElements.forEach(productElement => {
      const costElement = productElement.querySelector('.product__cost');
      const counterElement = productElement.querySelector('[data-counter]');

      if (costElement && counterElement) {
        const currentCost = parseInt(costElement.textContent.replace(/\D/g, ''), 10);
        const currentCount = parseInt(counterElement.textContent, 10);
        totalCost += currentCost * currentCount;
        totalCount += currentCount;
      }
    });

    // Обновляем общую сумму с форматированием
    totalElement.textContent = `${totalCost.toLocaleString('ru-RU')} ₽`;

    // Обновляем количество товаров с форматированием
    totalNumberElement.textContent = totalCount.toLocaleString('ru-RU');

    // Обновляем слово "товаров" с правильным склонением
    const wordForm = getCorrectWordForm(totalCount);
    totalWordElement.innerHTML = `<span>${totalCount.toLocaleString('ru-RU')}</span> ${wordForm}`;
  }

  // Функция для выделения всех чекбоксов
  if (checkboxAll) {
    checkboxAll.addEventListener('change', function() {
      const allCheckboxes = basketProducts.querySelectorAll('.checkbox__input:not(.checkbox-all .checkbox__input)');
      allCheckboxes.forEach(checkbox => {
        checkbox.checked = checkboxAll.checked;
      });
    });
  }

  // Функция для удаления всех выбранных товаров
  if (deleteAllButton) {
    deleteAllButton.addEventListener('click', function() {
      const selectedProducts = basketProducts.querySelectorAll('.checkbox__input:checked:not(.checkbox-all .checkbox__input)');
      selectedProducts.forEach(checkbox => {
        const product = checkbox.closest('.product');
        if (product) {
          product.remove(); // Удаляем товар
        }
      });

      // Снимаем выделение с "Выделить все" после удаления
      if (checkboxAll) {
        checkboxAll.checked = false;
      }

      // Обновляем общую сумму и количество товаров
      updateTotal();
    });
  }

  // Обработчики для каждого товара
  basketProducts.querySelectorAll('.product').forEach(productElement => {
    const costElement = productElement.querySelector('.product__cost');
    const counterElement = productElement.querySelector('[data-counter]');
    const minusButton = productElement.querySelector('[data-action="minus"]');
    const plusButton = productElement.querySelector('[data-action="plus"]');
    const deleteButton = productElement.querySelector('.product__items-delete');

    let currentCount = parseInt(counterElement.textContent, 10);
    let currentCost = parseInt(costElement.textContent.replace(/\D/g, ''), 10);

    // Функция обновления стоимости товара
    function updateCost() {
      const totalCost = currentCost * currentCount;
      costElement.textContent = `${totalCost.toLocaleString('ru-RU')} ₽`;
      updateTotal(); // Обновляем общую сумму и количество товаров
    }

    // Обработчик для кнопки "-"
    if (minusButton) {
      minusButton.addEventListener('click', function() {
        if (currentCount > 1) {
          currentCount--;
          counterElement.textContent = currentCount;
          updateCost();
        }
      });
    }

    // Обработчик для кнопки "+"
    if (plusButton) {
      plusButton.addEventListener('click', function() {
        currentCount++;
        counterElement.textContent = currentCount;
        updateCost();
      });
    }

    // Обработчик для кнопки удаления товара
    if (deleteButton) {
      deleteButton.addEventListener('click', function() {
        productElement.remove(); // Удаляем товар
        updateTotal(); // Обновляем общую сумму и количество товаров после удаления
      });
    }

    // Инициализация стоимости при загрузке страницы
    updateCost();
  });

  // Инициализация общей суммы и количества товаров при загрузке страницы
  updateTotal();
});
//-----------------------------------------------------------------------код для работы карзины товаров


//-----------------------------------------------------------------------код для сброса фильтров 
document.addEventListener('DOMContentLoaded', function() {
  // Находим контейнер фильтров
  const filterContainer = document.querySelector('.filter-menu__list-wrapper');

  // Проверяем, существует ли контейнер фильтров
  if (!filterContainer) {
    return; // Если контейнера нет, прекращаем выполнение кода
  }

  // Находим кнопку сброса
  const resetButton = filterContainer.querySelector('.filter-menu__button-reset');

  // Проверяем, существует ли кнопка сброса
  if (!resetButton) {
    return; // Если кнопки нет, прекращаем выполнение кода
  }

  // Добавляем обработчик события click
  resetButton.addEventListener('click', function() {
    // Сбрасываем выбранные элементы списка
    const listItems = filterContainer.querySelectorAll('.filter-menu__list li');
    listItems.forEach(item => {
      item.classList.remove('selected'); // Убираем класс selected, если он используется для выделения выбранных элементов
    });

    // Сбрасываем значения полей ввода цены
    const minInput = filterContainer.querySelector('#minInput1');
    const maxInput = filterContainer.querySelector('#maxInput1');
    if (minInput) minInput.value = '';
    if (maxInput) maxInput.value = '';

    // Сбрасываем ползунок (если используется какой-то плагин для слайдера)
    const slider = filterContainer.querySelector('#slider1');
    if (slider && slider.noUiSlider) {
      slider.noUiSlider.reset(); // Пример для noUiSlider
    }

    // Сбрасываем чекбоксы
    const checkboxes = filterContainer.querySelectorAll('.checkbox__input');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    // Дополнительно можно обновить отображение товаров, если это необходимо
    // Например, вызвать функцию, которая обновляет список товаров на основе текущих фильтров
    updateProductList();
  });

  // Функция для обновления списка товаров (заглушка)
  function updateProductList() {
    console.log('Обновление списка товаров...');
    // Здесь должен быть код для обновления списка товаров на основе текущих фильтров
  }
});