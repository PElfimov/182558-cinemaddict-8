import {getRandomInt} from "./utils";
import * as moment from 'moment';

/**
 * Генерация коллекции cлуяайных дат в пределах недели от текущей даты.
 * @param {number} countCollection количество генерируемых элементов.
 * @return {Array} массив дат в.
 */
const getDateCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    collection.push(Date.now() - (getRandomInt(1, 50) * 365 * 24 * 60 * 60 * 1000));
  }
  return collection;

};

const getRndDate = (maxSubstrakt) => moment().subtract(getRandomInt(1, maxSubstrakt), `days`).toDate();

/**
 * Генерация коллекции cлуяайных рейтингов фильмов.
 * @param {number} countCollection количество генерируемых элементов.
 * @return {Array} массив рейтингов.
 */
const getRratingCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    collection.push(getRandomInt(30, 100) / 10);
  }
  return collection;
};

/**
 * Генерация коллекции cлуяайных рейтингов фильмов.
 * @param {number} countCollection количество генерируемых элементов.
 * @return {Array} массив рейтингов.
 */
const getDurationCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    collection.push(`${getRandomInt(1, 5)}h ${getRandomInt(1, 60)}m`);
  }
  return collection;
};

/**
 * Генерация коллекции чисел в от 1 до 100.
 * @param {number} countCollection количество генерируемых элементов.
 * @return {Array} массив чисел.
 */
const getCommentsCoutnCollection = (countCollection) => {
  const collection = [];
  for (let i = 0; i < countCollection; i++) {
    collection.push(getRandomInt(1, 100));
  }
  return collection;
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.`;

/**
 * Генерация коллекции cлуяайных описаний фильмов.
 * @param {number} countCollection Количетво элеменотов на выходе
 * @param {string} collection Строка для генерации.
 * @param {string} separate разделитель
 * @return {Array} массив описаний рейтингов.
 */
const getDescriptionCollection = (countCollection, collection = description, separate = `.`) => {
  const sumCollection = [];
  const temtArray = collection.split(separate);
  for (let i = 0; i < countCollection; i++) {
    let tempCollection = ``;
    for (let j = 0; j <= getRandomInt(0, 2); j++) {
      tempCollection += (temtArray[getRandomInt(0, temtArray.length)] + `.`);
    }
    sumCollection.push(tempCollection);
  }
  return sumCollection;
};

export {
  getDateCollection,
  getRratingCollection,
  getDurationCollection,
  getDescriptionCollection,
  getCommentsCoutnCollection,
  getRndDate,
  getRandomInt
};
