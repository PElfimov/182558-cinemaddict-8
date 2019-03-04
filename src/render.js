import {getMockCollection} from "./mock.js";
import getCardTemplate from "./card_template.js";

/**
 * Подготовка списка карточек из колекции элементов .
 * @param {number} count Cards summ.
 * @return {string} строка для вставки на страницу.
 */
const getCardCollectionsMarkup = (count) => {
  let fragment = ``;
  getMockCollection(count).forEach((item) => {
    fragment += getCardTemplate(item);
  });
  return fragment;
};
export {
  getCardCollectionsMarkup
};
