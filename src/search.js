import Component from './component.js';

export default class Search extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._count = data.count;
    this._onSearchKeyDown = this._onSearchKeyDown.bind(this);

  }

  bind() {
    this._element.addEventListener(`keyup`, this._onSearchKeyDown);
    this._element.addEventListener(`keydown`, (evn)=>{
      if (evn.keyCode === 13) {
        evn.preventDefault();
      }
    });
  }

  unbind() {
    this._element.removeEventListener(`keyup`, this._onSearchKeyDown);

  }

  _onSearchKeyDown(evn) {
    evn.preventDefault();
    console.log(evn.target.value);

    // const filtersName = this._name;
    // if (typeof this._onFilter === `function`) {
    //   this._onFilter(filtersName);
    // }
  }

  set onSearch(fn) {
    this._onSearch = fn;
  }

  _partialUpdate() {
    this._element.innerHTML = this._createElement(this.template).innerHTML;
  }

  get template() {
    return `
    <form class="header__search search">
      <input type="text" name="search" class="search__field" placeholder="Search">
      <button type="submit" class="visually-hidden">Search</button>
    </form>
  `;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.querySelector(`form`);

  }

  // update(data) {
  //   this._count = data.count;
  // }


}
