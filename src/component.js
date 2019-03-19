
export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._filmDetailsControl = {
      'watchlist': false,
      'watched': false,
      'favorite': false,
    };
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._element = null;
    this._state = {};

  }

  _onEditButtonClick() {
    // eslint-disable-next-line no-unused-expressions
    typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }


  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = this._createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    this._element.querySelector(this._closeBtnClass)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(this._closeBtnClass)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update() {}

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}


