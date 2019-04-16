import Filter from './filter.js';
import {
  getCardCollectionsMarkup
} from './render';
import {
  addReitingOnPage
} from './user-rating';
import Statistic from './statistic';
import Search from './search';
import API from './api';
import * as _ from 'lodash';


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
  if (object.classList.contains(className)) {
    object.classList.remove(className);
  }
};

const addClass = (className, object) => {
  if (!object.classList.contains(className)) {
    object.classList.add(className);
  }

};

const dellElement = (className) => {
  if (mainConteiner.querySelector(className)) {
    mainConteiner.querySelector(className).remove();
  }
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
      stattistik.renderStat();
  }
  return null;
};

/**
 * Добавление фильтров на страницу
 * @param {object} tasks данные для фильтрации
 * @return {object} Отрисованные карточки фильмов .
 */
const addFilterr = (tasks) => FILTERS_NAME.forEach((item) => {
  const filterData = Object.assign({}, {
    name: item,
    count: 5
  });
  const filterComponent = new Filter(filterData);

  filterContainer.appendChild(filterComponent.render());
  filterComponent.onFilter = (data) => {
    removeCard();
    if (filterTasks(data, tasks)) {
      addCardOnPage(filterTasks(data, tasks));
    }
  };
});

/**
 * Живая фильтрация списка фильмов
 * @param {object} data данные для поиска
 * @param {string} stringSerch строка поиска
 * @return {object} массив объектов
 */
const filterSearch = (data, stringSerch) => {
  const newData = _.filter(data, (item) => {
    const title = _.lowerCase(item.filmTitle);
    const string = _.lowerCase(stringSerch);
    const result = title.includes(string);
    return result;
  });
  return newData;
};

/**
 * Добавление стоки поиска на страницу
 * @param {object} data данные для поиск
 */
const addSearchElement = (data) => {
  const headerContainer = document.querySelector(`.header`);
  const searchContainer = headerContainer.querySelector(`form`);
  const searchComponent = new Search(data);
  headerContainer.replaceChild(searchComponent.render(), searchContainer);
  searchComponent.onSearch = (stringSerch) => {
    removeCard();
    if (filterSearch(data, stringSerch)) {
      addCardOnPage(filterSearch(data, stringSerch));
    }
  };
};


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
    addSearchElement(tasks);
    addFilterr(tasks);
    addReitingOnPage(tasks);
  })
  .catch(onError);


export {
  api
};
