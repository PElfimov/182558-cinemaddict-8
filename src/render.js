import {
  getMockCollection
} from "./mock.js";
import Card from "./card.js";
import Popup from "./popup.js";


/**
 * Подготовка списка карточек из колекции элементов .
 * @param {number} count Cards summ.
 * @param {object} cardContainer Место вставки карточки
 * @param {object} popupContainer Место вставки попапа
 *
 */
const getCardCollectionsMarkup = (count, cardContainer, popupContainer) => {
  getMockCollection(count).forEach((item) => {
    const cardComponent = new Card(item);
    const popupComponent = new Popup(item);
    cardContainer.appendChild(cardComponent.render());

    cardComponent.onEdit = () => {
      popupContainer.appendChild(popupComponent.render());
    };

    popupComponent.onEdit = () => {
      popupContainer.removeChild(popupComponent.element);
      popupComponent.unrender();
    };

  });
};
export {
  getCardCollectionsMarkup
};
