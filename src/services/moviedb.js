export default class MovieDb {
    constructor(key) {
        this._apibase = "https://api.themoviedb.org/3";
        this._apikey = key;
    }

    addKey = () => {
        return `api_key=${this._apikey}`
    }

    getTrending = async (page=1, type="movie", period="week") => {
        /*Get the daily or weekly trending items
        * type = all, movie, person, tv
        * period = week, day
        * */
        const result = await this._fetchData(`${this._apibase}/trending/${type}/${period}?${this.addKey()}&page=${page}`);
        result.results = this._replaceResults(result.results);
        return result;
    };

    _fetchData = (url) => {
        return fetch(url).then((resp) => resp.json());
    };

    _replaceResults = (r) => {
        return r.map((i) => {
            return this._transformMovie(i)
        });
    };

    _transformMovie = (item) => {
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
    };

    searchMovie = async (query, page=1) => {
        const eQuery = encodeURIComponent(query);
        const result = await this._fetchData(`${this._apibase}/search/movie?${this.addKey()}&query=${eQuery}&page=${page}`);
        result.results = this._replaceResults(result.results);
        return result;
    };
}