import Component from './component.js';
import moment from "moment";

export default class Card extends Component {
  constructor(data) {
    super();
    this._imgUrl = data.imgUrl;
    this._filmTitle = data.filmTitle;
    this._rating = data.rating;
    this._yearOfIssue = data.yearOfIssue;
    this._duration = (moment.duration(data.duration, `minutes`).hours() + `h ` + moment.duration(data.duration, `minutes`).minutes() + `m`);
    this._genre = data.genre.join(`, `);
    this._description = data.description;
    this._commentsCoutn = data.commentsCoutn;
    this._coments = data.coments;
    this._filmDetailsControl = data.filmDetailsControl;


    this._closeBtnClass = `.film-card__comments`;
    this._commentsCoutn = this._coments.length;
    this._onControlButtonClick = this._onControlButtonClick.bind(this);

  }

  bind() {
    this._element.querySelector(this._closeBtnClass)
      .addEventListener(`click`, this._onEditButtonClick);
    this._element.querySelectorAll(`.film-card__controls-item`).forEach((elem) => {
      elem.addEventListener(`click`, this._onControlButtonClick);
    });
  }

  unbind() {
    this._element.querySelector(this._closeBtnClass)
      .removeEventListener(`click`, this._onEditButtonClick);
    this._element.querySelectorAll(`.film-card__controls-item`).forEach((elem) => {
      elem.removeEventListener(`click`, this._onControlButtonClick);
    });
  }

  _onControlButtonClick(evn) {
    evn.preventDefault();
    let btnParam = ``;
    if (evn.target.innerText === `WL`) {
      btnParam = `watchlist`;
    }
    if (evn.target.innerText === `WTCHD`) {
      btnParam = `watched`;
    }
    if (evn.target.innerText === `FAV`) {
      btnParam = `favorite`;
    }
    this._filmDetailsControl[btnParam] = !this._filmDetailsControl[btnParam];
    // eslint-disable-next-line no-unused-expressions
    typeof this._onButtonClick === `function` && this._onButtonClick(this._filmDetailsControl);
  }

  set onButtonClick(fn) {
    this._onButtonClick = fn;
  }

  _partialUpdate() {
    this._element.innerHTML = this._createElement(this.template).innerHTML;
  }

  get template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._filmTitle}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(this._yearOfIssue).getFullYear()}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="${this._imgUrl}" alt="" class="film-card__poster">
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

  update(data) {
    // eslint-disable-next-line no-unused-expressions
    data.coment.text && this._coments.push(data.coment);
    this._commentsCoutn = this._coments.length;
    this._filmDetailsControl = data.filmDetailsControl;
  }


}
