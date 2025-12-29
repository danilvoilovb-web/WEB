'use strict';

// 1. База данных картин (вынесена наверх для удобства)
const artCollection = {
  france: [
    { artist: "Марсель Руссо", title: "Охота Амура", price: "14 500 руб", material: "Холст, масло (50×80)" },
    { artist: "Анри Селин", title: "Дама с собачкой", price: "16 500 руб", material: "Акрил, бумага (50×80)" },
    { artist: "Франсуа Дюпон", title: "Процедура", price: "20 000 руб", material: "Цветная литография (40×60)" },
    { artist: "Луи Детуш", title: "Роза", price: "12 000 руб", material: "Бумага, акрил (50×80)" },
    { artist: "Франсуа Дюпон", title: "Птичья трапеза", price: "22 500 руб", material: "Цветная литография (40×60)" },
    { artist: "Франсуа Дюпон", title: "Процедура", price: "20 000 руб", material: "Цветная литография (40×60)" }
  ],
  germany: [
    { artist: "Курт Вернер", title: "Над городом", price: "16 000 руб", material: "Цветная литография (40×60)" },
    { artist: "Макс Рихтер", title: "Птенцы", price: "14 500 руб", material: "Холст, масло (50×80)" },
    { artist: "Мартин Майер", title: "Среди листьев", price: "20 000 руб", material: "Цветная литография (40×60)" },
    { artist: "Герман Беккер", title: "Яркая птица", price: "13 000 руб", material: "Цветная литография (40×60)" },
    { artist: "Вульф Бауэр", title: "Дятлы", price: "20 000 руб", material: "Бумага, акрил (50×80)" },
    { artist: "Вальтер Хартманн", title: "Большие воды", price: "23 000 руб", material: "Бумага, акрил (50×80)" }
  ],
  england: [
    { artist: "Пол Смит", title: "Дикий зверь", price: "19 500 руб", material: "Акварель, бумага (50×80)" },
    { artist: "Джон Уайт", title: "Скалистый берег", price: "17 500 руб", material: "Цветная литография (40×60)" },
    { artist: "Джим Уотсон", title: "Река и горы", price: "20 500 руб", material: "Акварель, бумага (50×80)" },
    { artist: "Юджин Зиллион", title: "Белый попугай", price: "15 500 руб", material: "Цветная литография (40×60)" },
    { artist: "Эрик Гиллман", title: "Ночная рыба", price: "12 500 руб", material: "Бумага, акрил (50×80)" },
    { artist: "Альфред Барр", title: "Рыжий кот", price: "21 000 руб", material: "Цветная литография (40×60)" }
  ]
};

// 2. Функция отрисовки карточек товаров
const renderGallery = () => {
  const boxes = document.querySelectorAll('.tabs__content-item-box');

  // Используем цикл for...of 
  for (const box of boxes) {
    const regionKey = box.dataset.region; // Получаем страну (france/germany/england)
    const itemIndex = parseInt(box.dataset.index); // Получаем номер картины
    
    // Безопасная проверка: если данных нет, пропускаем
    if (!artCollection[regionKey] || !artCollection[regionKey][itemIndex]) continue;

    const artwork = artCollection[regionKey][itemIndex];
    
    // Формируем путь к картинке. +1 нужно, так как картинки называются tabs-1...tabs-6, а индекс идет от 0
    const imageSource = `assets/${regionKey}/tabs-${itemIndex + 1}.jpg`;

    // Заполняем HTML
    box.innerHTML = `
      <img src="${imageSource}" alt="${artwork.title}" class="tabs__content-item-img">
      <p class="tabs__content-item-name">${artwork.artist}</p>
      <h5 class="tabs__content-item-title">${artwork.title}</h5>
      <p class="tabs__content-item-materials">${artwork.material}</p>
      <p class="tabs__content-item-price">${artwork.price}</p>
      <button class="tabs__content-item-button">В корзину</button>
    `;
  }
};

// 3. Логика переключения табов
const initTabs = () => {
  const tabLinks = document.querySelectorAll('.tabs__item');
  const tabContents = document.querySelectorAll('.tabs__content');

  tabLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      // Убираем активные классы у всех кнопок и блоков
      tabLinks.forEach(el => el.classList.remove('tabs__item--active'));
      tabContents.forEach(el => el.classList.remove('tabs__content--active'));

      // Добавляем активный класс нажатой кнопке
      link.classList.add('tabs__item--active');

      // Находим нужный блок по ID и показываем его
      const targetId = link.getAttribute('href');
      const targetContent = document.querySelector(targetId);
      if (targetContent) {
        targetContent.classList.add('tabs__content--active');
      }
    });
  });
};

// 4. Логика мобильного меню 
const initMobileMenu = () => {
  const burgerBtn = document.querySelector('.menu__btn');
  const navList = document.querySelector('.menu__list');

  if (burgerBtn && navList) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active'); // Анимация крестика 
      navList.classList.toggle('menu__list--active'); // Показ меню
    });
  }
};

// 5. Логика ссылок в футере (переключение табов при клике снизу)
const initFooterLinks = () => {
  const footerLinks = document.querySelectorAll('.footer__menu-link');

  // Словарь соответствия: Страна -> ID таба
  const tabMap = {
    'france': '#tab-1',
    'germany': '#tab-2',
    'england': '#tab-3'
  };

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const region = link.dataset.region;
      const targetTabId = tabMap[region];

      // Имитируем клик по нужному табу сверху
      const tabToClick = document.querySelector(`.tabs__item[href="${targetTabId}"]`);
      if (tabToClick) {
        tabToClick.click();
        
        // Плавная прокрутка к секции репродукций
        document.querySelector('#reproduction').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    });
  });
};

// Запуск всех скриптов после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initTabs();
  initMobileMenu();
  initFooterLinks();
});