/* eslint-disable camelcase */
// //////////////
// model-task.js
// //////////////
export default class ModelTask {
  constructor(data) {
    this.number = data[`id`];
    this.filmTitle = data.film_info.title;
    this.alternativeTitle = data.film_info.alternative_title;
    this.rating = data.film_info.total_rating;
    this.yearOfIssue = new Date(data.film_info.release.date);
    this.duration = data.film_info.runtime;
    this.genre = data.film_info.genre;
    this.imgUrl = data.film_info.poster;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.actors = data.film_info.actors;
    this.country = data.film_info.release.release_country;
    this.age = data.film_info.age_rating;
    this.writers = data.film_info.writers;
    this.userName = `Tony Super`;
    this.coments = [];
    data.comments.forEach((element) => {
      const newComent = {};
      newComent.author = element.author;
      newComent.emoji = element.emotion;
      newComent.text = element.comment;
      newComent.day = new Date(element.date);
      this.coments.push(newComent);
    });
    this.filmDetailsControl = {};
    this.filmDetailsControl.watchlist = data.user_details.watchlist;
    this.filmDetailsControl.watched = data.user_details.already_watched;
    this.filmDetailsControl.favorite = data.user_details.favorite;
    this.yourScore = data.user_details.personal_rating;
  }

  toRAW() {
    const newArrComents = [];
    this.coments.forEach((element) => {
      const newComent = {};
      newComent.author = element.author;
      newComent.emotion = element.emoji;
      newComent.comment = element.text;
      newComent.date = element.day;
      newArrComents.push(newComent);
    });
    return {
      id: this.number,
      film_info: {
        title: this.filmTitle,
        alternative_title: this.alternativeTitle,
        release: {
          date: this.yearOfIssue,
          release_country: this.country
        },
        runtime: this.duration,
        genre: this.genre,
        poster: this.imgUrl,
        description: this.description,
        director: this.director,
        actors: this.actors,
        age_rating: this.age,
        total_rating: this.rating,
        writers: this.writers
      },
      comments: newArrComents,
      user_details: {
        watchlist: this.filmDetailsControl.watchlist,
        already_watched: this.filmDetailsControl.watched,
        favorite: this.filmDetailsControl.favorite,
        personal_rating: this.yourScore,
      }
    };
  }

  static parseTask(data) {
    return new ModelTask(data);
  }

  static parseTasks(data) {
    return data.map(ModelTask.parseTask);
  }
}
