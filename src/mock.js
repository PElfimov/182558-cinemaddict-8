import {
  getRandomElement
} from "./utils";

import {
  getDateCollection,
  getRratingCollection,
  getDurationCollection,
  getDescriptionCollection,
  getCommentsCoutnCollection
} from "./rnd_element";

const MAX_SUM_COUNT = 6;
const mockData = {
  FILTERS_NAME: new Set([`all movies`, `watchlist`, `history`, `favorites`]),
  filmTitle: [
    `Accused`,
    `Blackmail`,
    `Blue blazes`,
    `Fuga da New York`,
    `Moonrise`,
    `Three friends`
  ],
  rating: getRratingCollection(MAX_SUM_COUNT),
  yearOfIssue: getDateCollection(MAX_SUM_COUNT),
  duration: getDurationCollection(MAX_SUM_COUNT),
  genre: new Set([
    `Comedy`, `Action`, `Adventure`, `Animation`, `Biography`, ` Comedy`,
    `Crime`, `Documentary`, `Drama`, `Family`, `Fantasy`, `Film Noir`, `History`,
    `Horror`, `Music`, `Musical`, `Mystery`, `Romance`, `Sci-Fi`,
    `Short`, `Sport`, `Superhero`, `Thriller`, `War`, `Western`
  ]),
  imgUrl: `./images/posters/`,
  description: getDescriptionCollection(MAX_SUM_COUNT),
  commentsCoutn: getCommentsCoutnCollection(MAX_SUM_COUNT)

};

/**
 * Генерация коллекции случайных карточек задач.
 * @param {number} countCollection количество карточек задач.
 * @return {object} коллекция объектов.
 */
const getMockCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    const newElement = {
      number: i,
      filmTitle: getRandomElement(mockData.filmTitle),
      rating: getRandomElement(mockData.rating),
      yearOfIssue: getRandomElement(mockData.yearOfIssue),
      duration: getRandomElement(mockData.duration),
      genre: getRandomElement([...mockData.genre]),
      imgUrl: mockData.imgUrl,
      description: getRandomElement(mockData.description),
      commentsCoutn: getRandomElement(mockData.commentsCoutn),
    };
    collection.push(newElement);
  }
  return collection;
};

export {
  mockData,
  getMockCollection
};
