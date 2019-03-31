// //////////////
// model-task.js
// //////////////
export default class ModelTask {
  constructor(data) {
    console.log(data);
    this.number = data[`id`];
    this.filmTitle = data.film_info.title;
    this.alternativeTitle = data.film_info.alternative_title;
    this.rating = data.film_info.age_rating;
    this.yearOfIssue = new Date(data.film_info.release.date);
    this.duration = data.film_info.runtime;
    this.genre = data.film_info.genre;
    this.imgUrl = data.film_info.poster;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.actors = data.film_info.actors;
    this.country = data.film_info.release.release_country;
    this.age = data.film_info.age_rating;
    this.totalRating = data.film_info.total_rating;
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

  static parseTask(data) {
    return new ModelTask(data);
  }

  static parseTasks(data) {
    return data.map(ModelTask.parseTask);
  }
}
