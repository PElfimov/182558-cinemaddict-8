/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
import Component from './component.js';
import moment from "moment";

export default class Popup extends Component {
  constructor(data) {
    super();
    this._imgUrl = data.imgUrl;
    this._filmTitle = data.filmTitle;
    this._director = data._director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._country = data.country;
    this._rating = data.rating;
    this._yourRate = data.yourRate;
    this._yearOfIssue = data.yearOfIssue;
    this._duration = data.duration;
    this._genre = data.genre;
    this._description = data.description;
    this._age = data.age;
    this._userName = data.userName;
    this._yourScore = data.yourScore;

    this._closeBtnClass = `.film-details__close-btn`;
    this._coments = data.coments;
    this._releaseDate = moment(this._yearOfIssue).format(`Do MMMM YYYY`);

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
      // eslint-disable-next-line no-unused-expressions
      (property === `comment-emoji`) && (property = `emoji`);
      taskEditMapper[property] && taskEditMapper[property](value);
    }
    entry.coment.day = moment();
    entry.coment.author = this._userName;
    return entry;
  }

  _onEditButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);
    // eslint-disable-next-line no-unused-expressions
    typeof this._onEdit === `function` && this._onEdit(newData);
    this.update(newData);
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
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${ i === +cheskCount ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`;
    }
    return ratingColect;
  }

  get template() {
    const re = /\ /g;
    const imgUrl = this._imgUrl + this._filmTitle.toLowerCase().replace(re, `-`) + `.jpg`;


    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${imgUrl}">

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
                  <p class="film-details__user-rating">Y${this._yourRate}</p>
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
                  <td class="film-details__cell">${this._releaseDate} (USA)</td>
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

              <p class="film-details__film-description">${this._description }
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
              <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
              <button class="film-details__watched-reset" type="button">undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._filmTitle}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>

                <div class="film-details__user-rating-score">
                  ${this._ratingColection(this._yourScore) }
                </div>
              </section>
            </div>
          </section>
        </form>
      </section>`;
  }
  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.querySelector(`section`);
  }

  static createMapper(target) {
    // eslint-disable-next-line no-unused-expressions
    return {
      watched: (value) => target.filmDetailsControl.watched = value,
      watchlist: (value) => target.filmDetailsControl.watchlist = value,
      favorite: (value) => target.filmDetailsControl.favorite = value,
      emoji: (value) => target.coment.emoji = value,
      comment: (value) => target.coment.text = value,
      score: (value) => target.yourScore = value,
    };
  }

  update(data) {
    this._yourScore = data.yourScore;
    this._filmDetailsControl = data.filmDetailsControl;


  }
}
