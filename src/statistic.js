import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

export default class Statistic {
  constructor(data) {
    this._datecolection = data;
    this._watched = ``;
    this._totalDuration = new Date();
    this._topGenre = ``;
    this._tempCollection = [];
    this._gengeColectionData = [];
    this._duration = ``;
    this._topGengeName = ``;

    this._element = null;
  }

  _getGenre(data) {
    data.genre();
  }


  _ststistikData() {
    this._tempCollection = [...this._datecolection];
    this._tempCollection = this._tempCollection.filter((it) => it.filmDetailsControl.watched);
    this._watched = this._tempCollection.length;
    let time = 0;
    const gengeOdj = {};
    const gengeSet = new Set();

    this._tempCollection.forEach((element) => {
      time += element.duration;
      gengeSet.add(element.genre);
    });
    [...gengeSet].forEach((element) => {
      gengeOdj[element] = 0;
    });

    this._tempCollection.forEach((element) => {
      gengeOdj[element.genre]++;
    });

    this._totalDurationHours = moment.duration(time, `minutes`).hours();
    this._totalDurationMinutes = moment.duration(time, `minutes`).minutes();
    this._gengeColection = [...gengeSet];
    Object.entries(gengeOdj).forEach((element, index) => {
      this._gengeColectionData.push(element[1]);
    });
    const maxtCountgenge = Math.max(...this._gengeColectionData);

    Object.entries(gengeOdj).forEach((element) => {
      if (element[1] === maxtCountgenge) {
        this._topGengeName = element[0];
      }
    });
    console.log ([...this._gengeColectionData]);
    console.log (this._topGengeName);

  }


  get template() {
    this._ststistikData();
    return `
      <section class="statistic">
        <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._watched} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this._totalDurationHours} <span class="statistic__item-description">h</span> ${this._totalDurationMinutes} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._topGengeName}</p>
          </li>
        </ul>
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
      </section>`;
  }

  render() {
    this._element = this._createElement(this.template);
    return this._element;
  }

  unrender() {
    this._element.remove();
    this._element = null;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.querySelector(`section`);
  }

  get renderStat() {

    const statisticCtx = document.querySelector(`.statistic__chart`);
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._gengeColection,
        datasets: [{
          data: this._gengeColectionData,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: 'start',
            align: 'start',
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  };


}
