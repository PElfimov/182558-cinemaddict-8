/**
 * Шаблон карточки фильма.
 * @param {object} element Объект с данными для карточки задачи.
 * @return {string} разметка HTML блока с карточкой задачи.
 */
export default (element) => {
  const re = /\ /g;
  const imgUrl = element.imgUrl + element.filmTitle.toLowerCase().replace(re, `-`) + `.jpg`;
  return `<article class="film-card">
<h3 class="film-card__title">${element.filmTitle}</h3>
<p class="film-card__rating">${element.rating}</p>
<p class="film-card__info">
  <span class="film-card__year">${new Date(element.yearOfIssue).getFullYear()}</span>
  <span class="film-card__duration">${element.duration}</span>
  <span class="film-card__genre">${element.genre}</span>
</p>
<img src="${imgUrl}" alt="" class="film-card__poster">
<p class="film-card__description">${element.description}</p>
<button class="film-card__comments">${element.commentsCoutn} comments</button>

<form class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
</form>
</article>`;
};
