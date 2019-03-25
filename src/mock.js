import {getRandomElement, getRandomInt} from "./utils";
import {getRndDate} from "./rnd_element";

import {
  getDateCollection,
  getRratingCollection,
  getDurationCollection,
  getDescriptionCollection,
} from "./rnd_element";

const MAX_SUM_COUNT = 6;
const mockData = {
  FILTERS_NAME: new Set([`all movies`, `watchlist`, `history`, `favorites`, `stats`]),
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
    `Comedy`, `Action`, `Adventure`, `Animation`, `Biography`,
    `Crime`, `Documentary`, `Drama`, `Family`, `Fantasy`, `Film Noir`, `History`,
    `Horror`, `Music`, `Musical`, `Mystery`, `Romance`, `Sci-Fi`,
    `Short`, `Sport`, `Superhero`, `Thriller`, `War`, `Western`
  ]),
  imgUrl: `./images/posters/`,
  description: getDescriptionCollection(MAX_SUM_COUNT),
  coments: [
    {
      emoji: `grinning`,
      text: `So long-long story, boring!`,
      author: `Tim Macoveev`,
      day: getRndDate(20),
    },
    {
      emoji: `sleeping`,
      text: `So Greate  best, boring!`,
      author: `Tim Macoveev`,
      day: getRndDate(20),
    },
    {
      emoji: `neutral-face`,
      text: `So Greate  best, boring!`,
      author: `Tim Macoveev`,
      day: getRndDate(20),
    }
  ],
  filmDetailsControl: {
    'watchlist': false,
    'watched': false,
    'favorite': false,
  },
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
      coments: [...mockData.coments],
      age: getRandomInt(4, 18),
      userName: `Tony Super`,
      filmDetailsControl: Object.assign({}, mockData.filmDetailsControl),
    };
    collection.push(newElement);
  }
  return collection;
};

export {
  mockData,
  getMockCollection
};
