import Component from './component.js';

export default class Card extends Component {
  constructor(data) {
    super();
    this._imgUrl = data.imgUrl;
    this._filmTitle = data.filmTitle;
    this._rating = data.rating;
    this._yearOfIssue = data.yearOfIssue;
    this._duration = data.duration;
    this._genre = data.genre;
    this._description = data.description;
    this._commentsCoutn = data.commentsCoutn;

    this._closeBtnClass = `.film-card__comments`;
  }

  get template() {
    const re = /\ /g;
    const imgUrl = this._imgUrl + this._filmTitle.toLowerCase().replace(re, `-`) + `.jpg`;
    return `<article class="film-card">
      <h3 class="film-card__title">${this._filmTitle}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(this._yearOfIssue).getFullYear()}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="${imgUrl}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._commentsCoutn} comments</button>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
      </article>`;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

}
