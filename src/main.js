const FILTERS_NAME = [`all movies`, `watchlist`, `history`, `favorites`];

import makeFilter from './make-filter.js';
import makeTask from './make-card.js';

const makeFilterCount = () => {
  const filterArray = [];
  for (let i = 1; i < FILTERS_NAME.length; i++) {
    filterArray[i] = Math.floor(Math.random() * 10);
  }
  return filterArray;
};
const filtersCount = makeFilterCount();

const mainFilter = document.querySelector(`.main-navigation`);
const filmList = document.querySelectorAll(`.films-list__container`);


FILTERS_NAME.forEach((elem, index) => {
  mainFilter.insertAdjacentHTML(`beforeEnd`, makeFilter(elem, filtersCount[index], elem === `all movies`));
});


for (let i = 1; i <= 7; i++) {
  filmList[0].insertAdjacentHTML(`afterBegin`, makeTask);
}

filmList[1].insertAdjacentHTML(`afterBegin`, makeTask);
filmList[1].insertAdjacentHTML(`afterBegin`, makeTask);
// filmList[2].insertAdjacentHTML(`afterBegin`, makeTask);
// filmList[2].insertAdjacentHTML(`afterBegin`, makeTask);
