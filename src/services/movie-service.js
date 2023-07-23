import { format } from 'date-fns'

export default class MovieService {
  async getResource(url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Couldn't fetch url ${url}, recieved ${res.status}`)
    }
    return res.json()
  }

  async getAllMovies() {
    const res = await this.getResource(
      'https://api.themoviedb.org/3/search/movie?query=get&api_key=d73a32038f6ba677e9bf01e5a9cd7c16'
    )
    return res.results.map(this._transformMovie)
  }

  getMovie(id) {
    return this.getResource(
      `https://api.themoviedb.org/3/movie/${id}?query=get&api_key=d73a32038f6ba677e9bf01e5a9cd7c16`
    )
  }

  _transformMovie = (item) => ({
    id: item.id,
    title: item.title,
    dateFilm: format(new Date(item.release_date.split('-').map(Number)), 'MMMM d, yyyy'),
    genreFilm: ['genre', 'genre'],

    // genreFilm: item.genres,
    aboutFilm: this.limitText(item.overview),
    posterFilmUrl: `https://image.tmdb.org/t/p/w185${item.poster_path}`,
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
