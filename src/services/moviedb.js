export default class MovieDb {
    constructor(key) {
        this._apibase = "https://api.themoviedb.org/3";
        this._apikey = key;
    }

    addKey = () => {
        return `api_key=${this._apikey}`
    }

    async getTrending(page=1, type="movie", period="week") {
        /*Get the daily or weekly trending items
        * type = all, movie, person, tv
        * period = week, day
        * */
        const response = await fetch(`${this._apibase}/trending/${type}/${period}?${this.addKey()}&page=${page}`);
        const result = await response.json();
        result.results = await result.results.map((i) => {
            return this._transformTrending(i)
        });
        return result;
    }

    _transformTrending = (item) => {
        const {id, title, poster_path, release_date,
        overview, genre_ids, vote_average, vote_count } = item;
        return {
            title,
            id,
            poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
            releaseDate: release_date,
            overview,
            genres: genre_ids,
            rating: vote_average,
            voters: vote_count
        }
    }
}