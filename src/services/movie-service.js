import { format } from 'date-fns'

export default class MovieService {
  _api_key = 'd73a32038f6ba677e9bf01e5a9cd7c16'

  async getResource(url) {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Couldn't fetch url ${url}, recieved ${res.status}`)
      }
      return res.json()
    } catch (err) {
      return err.message
    }
  }

  async getSearchMovies(page, title) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}&api_key=${this._api_key}`
    )
    return res.results.map(this._transformMovie)
  }

  async getTotalPages(page, title) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}&api_key=${this._api_key}`
    )
    return res.total_pages
  }

  async getAllGenres() {
    const res = await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._api_key}`)
    return res.genres
  }

  async createNewSession() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._api_key}`
    )
    return res.guest_session_id
  }

  getMovie(id) {
    return this.getResource(`https://api.themoviedb.org/3/movie/${id}?query=ii&api_key=${this._api_key}`)
  }

  async setMovieRating(id, guestSessionToken, rate) {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this._api_key}&guest_session_id=${guestSessionToken}`
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ value: rate }),
    }).catch((err) => err.message)
  }

  async getMovieRating(guestSessionToken, page) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${guestSessionToken}/rated/movies?page=${page}&api_key=${this._api_key}`
    )
    return res.results.map(this._transformMovie)
  }

  async getTotalPagesMovieRating(guestSessionToken) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${guestSessionToken}/rated/movies?api_key=${this._api_key}`
    )
    return res.total_pages
  }

  _transformMovie = (item) => ({
    id: item.id,
    title: item.title,
    dateFilm: format(new Date(item.release_date.split('-').map(Number)), 'MMMM d, yyyy'),
    genreFilm: item.genre_ids,
    aboutFilm: this.limitText(item.overview),
    posterFilmUrl: `https://image.tmdb.org/t/p/w185${item.poster_path}`,
    ratingFilm: item.rating,
  })

  limitText(text) {
    const size = 150
    if (text.length > size) {
      const shortText = text.slice(0, size)
      const indexOfLastGap = shortText.lastIndexOf(' ')
      return `${shortText.slice(0, indexOfLastGap)} ...`
    }
    return text
  }
}
