/* eslint-disable consistent-return */
import Filter from './filter.js';
import {
  getCardCollectionsMarkup
} from './render';
import Statistic from './statistic';
import API from './api';

/**
 * Удаление карточек со сроницы
 */
const removeCard = () => {
  document.querySelectorAll(`.film-card`).forEach((elem) => {
    elem.remove();
  });
};


const filterContainer = document.querySelector(`.main-navigation`);
const filmConteiner = document.querySelector(`.films`);
const mainConteiner = document.querySelector(`.main`);
const FILTERS_NAME = [`all movies`, `watchlist`, `history`, `favorites`, `stats`];
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const api = new API({
  endPoint: END_POINT,
  authorization: AUTHORIZATION
});


const textAlert = document.createElement(`h2`);
textAlert.textContent = `Loading movies...`;
document.querySelector(`.films-list__container`).appendChild(textAlert);

const onError = (error) => {
  textAlert.textContent = `Something went wrong while loading movies. Check your connection or try again later ${error}`;
};

const delClass = (className, object) => {
  // eslint-disable-next-line no-unused-expressions
  object.classList.contains(className) && object.classList.remove(className);
};

const addClass = (className, object) => {
  // eslint-disable-next-line no-unused-expressions
  !object.classList.contains(className) && object.classList.add(className);
};

const dellElement = (className) => {
  // eslint-disable-next-line no-unused-expressions
  mainConteiner.querySelector(className) && mainConteiner.querySelector(className).remove();
};

/**
 * Сортировка фильмов фильтром
 * @param {string} filterName Имя фильтра
 * @param {object} dataColection Объект с данными
 * @return {object} Отфильтрованный обект с данными.
 */
const filterTasks = (filterName, dataColection) => {
  switch (filterName) {
    case `all movies`:
      delClass(`visually-hidden`, filmConteiner);
      dellElement(`.statistic`);

      return dataColection;

    case `watchlist`:
      dellElement(`.statistic`);
      delClass(`visually-hidden`, filmConteiner);
      return dataColection.filter((it) => it.filmDetailsControl.watchlist);

    case `history`:
      dellElement(`.statistic`);
      delClass(`visually-hidden`, filmConteiner);
      return dataColection.filter((it) => it.filmDetailsControl.watched);

    case `favorites`:
      dellElement(`.statistic`);
      delClass(`visually-hidden`, filmConteiner);
      return dataColection.filter((it) => it.filmDetailsControl.favorite);

    case `stats`:
      dellElement(`.statistic`);
      addClass(`visually-hidden`, filmConteiner);
      const stattistik = new Statistic(dataColection);
      const ststistikElement = stattistik.render();
      mainConteiner.appendChild(ststistikElement);
      // eslint-disable-next-line no-unused-expressions
      stattistik.renderStat;
  }
};

const addFilterr = (tasks) => FILTERS_NAME.forEach((item) => {
  const filterData = Object.assign({}, {
    name: item,
    count: 5
  });
  const filterComponent = new Filter(filterData);

  filterContainer.appendChild(filterComponent.render());
  filterComponent.onFilter = (data) => {
    removeCard();
    // eslint-disable-next-line no-unused-expressions
    filterTasks(data, tasks) && addCardOnPage(filterTasks(data, tasks));
  };
});


/**
 * Вставка карточек на страницу
 * @param {object} data данные для отрисовки
 */
const addCardOnPage = (data) => {
  removeCard();
  const cardContainer = document.querySelectorAll(`.films-list__container`);
  const popupContainer = document.querySelector(`body`);
  getCardCollectionsMarkup(data, cardContainer[0], popupContainer);
  // getCardCollectionsMarkup(topRatedColection, cardContainer[1], popupContainer);
  // getCardCollectionsMarkup(mostCommented, cardContainer[2], popupContainer);
};

api.getTasks()
  .then((tasks) => {
    textAlert.remove();
    addCardOnPage(tasks);
    addFilterr(tasks);
  })
  .catch(onError);


export {
  api
};
