
/**
 * Рейтинг пользоывателя.
 * @param {object} collection коллекция объектов.
 * @return {string}  строка рейтинг пользователя.
 */
const getUserRaiting = (collection) => {
  let i = 0;
  let raiting = ``;
  collection.forEach((element) => {
    if (element.filmDetailsControl.watched) {
      i++;
    }
  });

  switch (true) {
    case (i > 21):
      raiting = `Movie buff`;
      break;

    case (i > 11):
      raiting = `Fan`;
      break;

    default:
      raiting = `Novicef`;

  }

  return raiting;
};

const addReitingOnPage = (collection) => {
  const profileRaiting = document.querySelector(`.profile__rating`);
  profileRaiting.textContent = getUserRaiting(collection);
};

export {addReitingOnPage};
