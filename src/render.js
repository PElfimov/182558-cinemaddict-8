import Card from "./card.js";
import Popup from "./popup.js";
import {
  api
} from "./main.js";


/**
 * Подготовка списка карточек из колекции элементов .
 * @param {object} dataColection Cards даные.
 * @param {object} cardContainer Место вставки карточки
 * @param {object} popupContainer Место вставки попапа
 *
 */
const getCardCollectionsMarkup = (dataColection, cardContainer, popupContainer) => {
  dataColection.forEach((item) => {
    const cardComponent = new Card(item);
    const popupComponent = new Popup(item);
    cardContainer.appendChild(cardComponent.render());

    cardComponent.onEdit = () => {
      popupContainer.appendChild(popupComponent.render());
    };

    cardComponent.onButtonClick = (newObject) => {
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          item.filmDetailsControl = newObject;
          popupComponent.update(data);
        });
    };

    popupComponent.onEdit = (newObject) => {

      item.filmDetailsControl = newObject.filmDetailsControl;
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          data.coment = newObject.coment;
          cardComponent.update(data);
          cardComponent.unbind();
          cardComponent.partialUpdate();
          cardComponent.bind();
          popupContainer.removeChild(popupComponent.element);
          popupComponent.unrender();
        });

    };

    popupComponent.onSentComment = (newObject) => {
      popupComponent.block();
      item.filmDetailsControl = newObject.filmDetailsControl;
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          data.coment = newObject.coment;
          popupComponent.update(data);
          popupComponent.unbind();
          popupComponent.partialUpdate();
          popupComponent.bind();
          popupComponent.unblock();
        })
        .catch(()=>{
          popupComponent.shakeReitingTextForm();
          popupComponent.unblock();
        });

    };

    popupComponent.onRadioButton = (newObject) => {
      item.yourScore = newObject.yourScore;
      popupComponent.block();
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          popupComponent.update(data);
          popupComponent.unbind();
          popupComponent.partialUpdate();
          popupComponent.bind();
          popupComponent.unblock();
        })
        .catch(()=>{
          popupComponent.shakeReitingForm();
          popupComponent.unblock();
        });
    };

  });
};
export {
  getCardCollectionsMarkup
};
