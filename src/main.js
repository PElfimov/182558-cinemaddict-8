import getFilter from './filter_template.js';
import {
  getCardCollectionsMarkup
} from './render';
import {
  mockData
} from './mock';

/**
 * Удаление карточек со сроницы
 */
const removeCard = () => {
  document.querySelectorAll(`.film-card`).forEach((elem) => {
    elem.remove();
  });
};

/**
 * Вставка Фильтра на страницу
 */

const makeFilterCount = () => {
  const filterArray = [];
  let summArr = 0;
  for (let i = 1; i < [...mockData.FILTERS_NAME].length; i++) {
    filterArray[i] = Math.floor(Math.random() * 10);
    summArr += filterArray[i];
  }
  filterArray[0] = summArr;
  return filterArray;
};
const filtersCount = makeFilterCount();
const mainFilter = document.querySelector(`.main-navigation`);
[...mockData.FILTERS_NAME].forEach((elem, index) => {
  mainFilter.insertAdjacentHTML(`beforeEnd`, getFilter(elem, filtersCount[index], elem === `all movies`));
});

/**
 * Вставка карточек на страницу
 * @param {num} count количесто карточек
 */
const addCardOnPage = (count) => {
  removeCard();
  const cardContainer = document.querySelectorAll(`.films-list__container`);
  const popupContainer = document.querySelector(`body`);
  getCardCollectionsMarkup(count, cardContainer[0], popupContainer);
  getCardCollectionsMarkup(2, cardContainer[1], popupContainer);
  getCardCollectionsMarkup(2, cardContainer[2], popupContainer);
};


addCardOnPage(filtersCount[0]);
mainFilter.querySelectorAll(`.main-navigation__item`).forEach((elem, index) => {
  elem.addEventListener(`click`, function () {
    addCardOnPage(filtersCount[index]);

  });
});
