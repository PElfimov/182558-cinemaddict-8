import Component from './component.js';
import moment from "moment";
import * as _ from 'lodash';

export default class Popup extends Component {
  constructor(data) {
    super();
    this._imgUrl = data.imgUrl;
    this._filmTitle = data.filmTitle;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors.join(`, `);
    this._country = data.country;
    this._rating = data.rating;
    this._yearOfIssue = data.yearOfIssue;
    this._duration = (moment.duration(data.duration, `minutes`).hours() + `h ` + moment.duration(data.duration, `minutes`).minutes() + `m`);
    this._genre = data.genre.join(`, `);
    this._description = data.description;
    this._age = data.age;
    this._userName = data.userName;
    this._yourScore = data.yourScore;
    this._filmDetailsControl = data.filmDetailsControl;

    this._closeBtnClass = `.film-details__close-btn`;
    this._coments = data.coments;
    this._releaseDate = moment(this._yearOfIssue).format(`Do MMMM YYYY`);
    this._onEditRadioButtonClick = this._onEditRadioButtonClick.bind(this);
    this._onSentCommentKeyDown = this._onSentCommentKeyDown.bind(this);
    this._onClickUndo = this._onClickUndo.bind(this);
    this._onEsk = this._onEsk.bind(this);
    this._shakeStyleEnebled = false;
    this._commentStatus = ``;
  }


  _processForm(formData) {
    const entry = {
      yourScore: Number,
      filmDetailsControl: {
        'watchlist': false,
        'watched': false,
        'favorite': false,
      },
      coment: {
        text: ``,
        emoji: ``,
      },
    };

    const taskEditMapper = Popup.createMapper(entry);

    for (const pair of formData.entries()) {
      let [property, value] = pair;
      if (property === `comment-emoji`) {
        property = `emoji`;
      }
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    entry.coment.day = moment();
    entry.coment.author = this._userName;
    return entry;
  }

  _onEditButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);
    newData.commentStatus = ``;
    if (typeof this._onEdit === `function`) {
      this._onEdit(newData);
    }
  }

  _onEsk(evt) {
    if (evt.keyCode === 27) {
      this._onEditButtonClick(evt);
    }
  }

  _onEditRadioButtonClick(evt) {
    evt.preventDefault();
    const newData = {};
    newData.yourScore = evt.target.innerText;
    if (typeof this._onRadioButton === `function`) {
      this._onRadioButton(newData);
    }
  }

  _onSentCommentKeyDown(evt) {
    if (evt.ctrlKey === true & evt.keyCode === 13) {
      evt.preventDefault();
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = this._processForm(formData);
      newData.commentStatus = `Comment added`;
      if (typeof this._onSentComment === `function`) {
        this._onSentComment(newData);
      }
    }
  }

  _onClickUndo(evt) {
    evt.preventDefault();
    this._coments = _.dropRight(this._coments);
    if (typeof this._onUndo === `function`) {
      this._onUndo(this._coments);
    }
  }


  set onUndo(fn) {
    this._onUndo = fn;
  }


  set onSentComment(fn) {
    this._onSentComment = fn;
  }


  set onRadioButton(fn) {
    this._onRadioButton = fn;
  }

  _smileFace(name) {
    if (name === `grinning`) {
      name = `😀`;
    }
    if (name === `neutral-face`) {
      name = `😐`;
    }
    if (name === `sleeping`) {
      name = `😴`;
    }
    return name;

  }

  hideUndo() {
    const object = this._element.querySelector(`.film-details__watched-reset`);
    const className = `visually-hidden`;
    if (object.classList.contains(className)) {
      object.classList.add(className);
    }
  }

  showUndo() {
    const object = this._element.querySelector(`.film-details__watched-reset`);
    const className = `visually-hidden`;
    if (object.classList.contains(className)) {
      object.classList.remove(className);
    }
  }

  get comentColection() {
    let colection = ``;
    this._coments.forEach((element) => {
      const colectionItem = `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${this._smileFace(element.emoji)}</span>
        <div>
          <p class="film-details__comment-text">${element.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${element.author}</span>
            <span class="film-details__comment-day">${moment().diff(moment(element.day), `days`)} days ago</span>
          </p>
        </div>
      </li>`;
      colection += colectionItem;
    });
    return colection;
  }

  _ratingColection(cheskCount) {
    let ratingColect = ``;
    for (let i = 0; i < 10; i++) {
      ratingColect += `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${i === Math.round(+cheskCount) ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`;
    }
    return ratingColect;
  }

  get template() {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._imgUrl}">

              <p class="film-details__age">Age ${this._age} +</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._filmTitle}</h3>
                  <p class="film-details__title-original">Original: ${this._filmTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                  <p class="film-details__user-rating">${this._yourScore}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${this._releaseDate} (${this._country})</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">Animation</span>
                    <span class="film-details__genre">Action</span>
                    <span class="film-details__genre">Adventure</span></td>
                </tr>
              </table>

              <p class="film-details__film-description">${this._description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._filmDetailsControl.watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._filmDetailsControl.watched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._filmDetailsControl.favorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>

          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">1</span></h3>

            <ul class="film-details__comments-list">
              ${this.comentColection}
            </ul>

            <div class="film-details__new-comment">
              <div>
                <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
                <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                  <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
                </div>
              </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
              </label>
            </div>
          </section>

          <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
              <span class="film-details__watched-status film-details__watched-status--active ">${this._commentStatus}</span>
              <button class="film-details__watched-reset visually-hidden" type="button">undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._filmTitle}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>

                <div class="film-details__user-rating-score">
                  ${this._ratingColection(this._yourScore)}
                </div>
              </section>
            </div>
          </section>
        </form>
      </section>`;
  }


  static createMapper(target) {

    return {
      watched: (value) => {
        return (target.filmDetailsControl.watched = value);
      },
      watchlist: (value) => {
        return (target.filmDetailsControl.watchlist = value);
      },
      favorite: (value) => {
        return (target.filmDetailsControl.favorite = value);
      },
      emoji: (value) => {
        return (target.coment.emoji = value);
      },
      comment: (value) => {
        return (target.coment.text = value);
      },
      score: (value) => {
        return (target.yourScore = value);
      },
    };
  }

  partialUpdate() {
    this._element.innerHTML = this._createElement(this.template).innerHTML;
  }

  _shake(element) {
    const template = `<style>
      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }

        10%,
        30%,
        50%,
        70%,
        90% {
          transform: translateX(-5px);
        }

        20%,
        40%,
        60%,
        80% {
          transform: translateX(5px);
        }
      }
      .shake {
        animation: shake 0.6s;
      }
    </style>`;
    if (!this._shakeStyleEnebled) {
      this._shakeStyleEnebled = true;
      document.querySelector(`head`).insertAdjacentHTML(`beforeend`, template);
    }
    element.classList.toggle(`shake`);
  }

  shakeReitingForm() {
    const reitingForm = this._element.querySelector(`.film-details__user-rating-score`);
    reitingForm.style = `background-color: red;`;
    this._shake(reitingForm);
  }

  shakeReitingTextForm() {
    const reitingForm = this._element.querySelector(`.film-details__comment-label`);
    reitingForm.style = `border:2px solid red;`;
    this._shake(reitingForm);
  }

  block() {
    this.element.querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
      elem.disabled = true;
    });
    this.element.querySelectorAll(`.film-details__control-input`).forEach((elem) => {
      elem.disabled = true;
    });
    this.element.querySelector(`.film-details__comment-input`).disabled = true;
  }

  unblock() {
    this.element.querySelectorAll(`.film-details__user-rating-input`).forEach((elem) => {
      elem.disabled = false;
    });
    this.element.querySelectorAll(`.film-details__control-input`).forEach((elem) => {
      elem.disabled = false;
    });
    this.element.querySelector(`.film-details__comment-input`).disabled = false;
  }

  bind() {
    this._element.querySelector(this._closeBtnClass)
      .addEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, this._onClickUndo);
    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._onSentCommentKeyDown);
    document.addEventListener(`keydown`, this._onEsk);
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((elem) => {
      elem.addEventListener(`click`, this._onEditRadioButtonClick);
    });
  }

  unbind() {
    this._element.querySelector(this._closeBtnClass)
      .removeEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-details__watched-reset`)
      .removeEventListener(`click`, this._onClickUndo);
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((elem) => {
      elem.removeEventListener(`click`, this._onEditRadioButtonClick);
    });
    document.removeEventListener(`keydown`, this._onEsk);
  }

  update(data) {
    if (data.yourScore) {
      this._yourScore = data.yourScore;
    }
    if (data.filmDetailsControl) {
      this._filmDetailsControl = data.filmDetailsControl;
    }
    this._coments = data.coments;
    if (data.commentStatus) {
      this._commentStatus = data.commentStatus;
    } else {
      this._commentStatus = ``;
    }

  }
}
