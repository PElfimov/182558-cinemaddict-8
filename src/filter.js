import Component from './component.js';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._count = data.count;
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
    this._isChecked = false;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterButtonClick);

  }

  _onFilterButtonClick() {
    const filtersName = this._name;
    if (typeof this._onFilter === `function`) {
      this._onFilter(filtersName);
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _partialUpdate() {
    this._element.innerHTML = this._createElement(this.template).innerHTML;
  }

  get template() {

    const elementStats = `<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`;
    const elementFiltr = `
    <a href="#${this._name}"
    class="main-navigation__item
    ${ this._isChecked ? `main-navigation__item--active` : `` }">
    ${this._name[0].toUpperCase() + this._name.substring(1)}
    ${ this._count ? (`<span class="main-navigation__item-count">` + this._count + `</span>`) : ``}
    </a>`;
    return this._name === `stats` ? elementStats : elementFiltr;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.querySelector(`a`);

  }

  update(data) {
    this._count = data.count;
  }


}
