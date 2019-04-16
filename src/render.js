import Card from "./card.js";
import Popup from "./popup.js";
import {
  api, addFilterr, removeCard
} from "./main.js";
import {
  addReitingOnPage
} from './user-rating';

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
      item.filmDetailsControl = newObject;
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          popupComponent.update(data);
          removeCard(`.main-navigation__item`);
          addFilterr(dataColection);
          addReitingOnPage(dataColection);
        });
    };

    popupComponent.onUndo = (newData) => {
      item.coments = [...newData];

      popupComponent.block();
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          data.commentStatus = `Comment deleted`;
          popupComponent.update(data);
          popupComponent.unbind();
          popupComponent.partialUpdate();
          popupComponent.bind();
          popupComponent.unblock();
          removeCard(`.main-navigation__item`);
          addFilterr(dataColection);
          addReitingOnPage(dataColection);
        })
        .catch(() => {
          popupComponent.unblock();
        });
    };


    popupComponent.onEdit = (newObject) => {

      item.filmDetailsControl = newObject.filmDetailsControl;
      if (newObject.coment.text) {
        item.coments.push(newObject.coment);
      }
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          if (newObject.coment) {
            data.coment = newObject.coment;
          }
          cardComponent.update(data);
          popupComponent.update(data);
          cardComponent.unbind();
          cardComponent.partialUpdate();
          cardComponent.bind();
          if (popupComponent.element) {
            popupContainer.removeChild(popupComponent.element);
          }
          popupComponent.unrender();
          removeCard(`.main-navigation__item`);
          addFilterr(dataColection);
          addReitingOnPage(dataColection);
        });

    };

    popupComponent.onSentComment = (newObject) => {
      popupComponent.block();
      if (newObject.coment.text) {
        item.coments.push(newObject.coment);
      }
      api.updateTask({
        id: item.number,
        data: item.toRAW()
      })
        .then((data) => {
          data.commentStatus = newObject.commentStatus;
          popupComponent.update(data);
          popupComponent.unbind();
          popupComponent.partialUpdate();
          popupComponent.bind();
          popupComponent.unblock();
          popupComponent.showUndo();
          addReitingOnPage(dataColection);
          removeCard(`.main-navigation__item`);
          addFilterr(dataColection);
        })
        .catch(() => {
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
          removeCard(`.main-navigation__item`);
          addFilterr(dataColection);
          addReitingOnPage(dataColection);
        })
        .catch(() => {
          popupComponent.shakeReitingForm();
          popupComponent.unblock();
        });
    };

  });
};
export {
  getCardCollectionsMarkup
};
