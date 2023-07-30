import React, { Component } from 'react'
import { Tabs, Space, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'
// import { Space, Alert } from 'antd'

import SearchPage from '../search-page'
import RatedPage from '../rated-page'
import MovieService from '../../services/movie-service'
import { MovieServiceContext } from '../movie-service-context'
import './app.css'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    filmData: [],
    loading: true,
    error: false,
    totalPages: 0,
    filmTitleSearch: 'return',
    isModalOpen: false,
    guestSessionID: '',
    genres: [],
    ratedFilms: [],
    totelPagesRatedFilms: 0,
  }

  componentDidMount() {
    this.createNewSession()
    this.getAllGenres()
    this.filmSearch(this.state.filmTitleSearch)
  }

  // componentDidUpdate(prevProps) {
  //   if (this.state.filmData !== prevProps.filmData) {
  //     this.getMovieRating()
  //   }
  // }

  createNewSession = () => {
    this.movieService
      .createNewSession()
      .then((guestSessionID) => {
        this.setState({ guestSessionID })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  onChangePage = (e) => {
    if (this.state.filmTitleSearch !== '') {
      this.setState({ loading: true })
      this.movieService
        .getSearchMovies(e, this.state.filmTitleSearch)
        .then((filmData) => {
          this.getMovieRated()
          this.addFilmRating(filmData, this.state.ratedFilms)

          // this.setState({ filmData, loading: false })
        })
        .catch(this.onError)
    }
  }

  filmSearch = (title) => {
    this.setState({ filmTitleSearch: title, loading: true })

    this.movieService
      .getTotalPages(1, title)
      .then((totalPages) => {
        this.setState({ totalPages })
      })
      .catch(this.onError)

    this.movieService
      .getSearchMovies(1, title)
      .then((filmData) => {
        // this.setState({ filmData, loading: false })
        if (filmData.length === 0) {
          this.setState({ isModalOpen: true })
        }

        this.getMovieRated()
        this.addFilmRating(filmData, this.state.ratedFilms)
      })
      .catch(this.onError)

    // this.getMovieRated()
  }

  handleOk = () => {
    this.setState({ isModalOpen: false })
  }

  addFilmRating = (filmData, ratedFilms) => {
    if (ratedFilms.length !== 0) {
      let newFilmData = filmData.slice()

      newFilmData = newFilmData.map((film) => {
        const item = ratedFilms.find(({ id }) => id === film.id)
        return item || film
      })
      // console.log(newFilmData)
      this.setState({ filmData: newFilmData, loading: false })
    }
    this.setState({ filmData, loading: false })
  }

  getAllGenres() {
    this.movieService
      .getAllGenres()
      .then((genres) => {
        this.setState({ genres })
      })
      .catch(this.onError)
  }

  getMovieRated = (page = 1) => {
    this.setState({ loading: true })

    if (this.state.guestSessionID !== '') {
      this.movieService
        .getMovieRating(this.state.guestSessionID, page)
        .then((ratedFilms) => {
          this.setState({ ratedFilms })
        })
        .catch(this.onError)

      this.movieService
        .getTotalPagesMovieRating(this.state.guestSessionID)
        .then((totelPagesRatedFilms) => {
          this.setState({ totelPagesRatedFilms, loading: false })
        })
        .catch(this.onError)
    }
  }

  onChangePageRated = (e) => {
    this.setState({ loading: true })
    this.movieService
      .getMovieRating(this.state.guestSessionID, e)
      .then((ratedFilms) => {
        this.setState({ ratedFilms, loading: false })
      })
      .catch(this.onError)
    this.getMovieRated(e)
  }

  onChangeTabs = () => {
    this.getMovieRated()
  }

  render() {
    const {
      filmData,
      loading,
      error,
      totalPages,
      isModalOpen,
      genres,
      guestSessionID,
      ratedFilms,
      totelPagesRatedFilms,
    } = this.state
    const totalNumberOfMovies = totalPages * 20
    const totalNumberOfRatedMovies = totelPagesRatedFilms * 20

    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <SearchPage
            filmData={filmData}
            loading={loading}
            totalPages={totalPages}
            filmSearch={this.filmSearch}
            onChangePage={this.onChangePage}
            totalNumberOfMovies={totalNumberOfMovies}
            isModalOpen={isModalOpen}
            handleOk={this.handleOk}
            guestSessionID={guestSessionID}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <RatedPage
            loading={loading}
            onChangePage={this.onChangePageRated}
            guestSessionID={guestSessionID}
            ratedFilms={ratedFilms}
            totalNumberOfRatedMovies={totalNumberOfRatedMovies}
          />
        ),
      },
    ]
    // console.log(this.state.filmData)
    // console.log(this.state.ratedFilms)

    // console.log(items.forEach((item) => console.log(item.key)))
    if (error) {
      return (
        <section className="main">
          <Space>
            <Alert className="alert" message="Error" description="Something goes wrong..." type="error" showIcon />
          </Space>
        </section>
      )
    }

    return (
      <MovieServiceContext.Provider value={genres}>
        <section>
          <Online>
            <Tabs className="main" defaultActiveKey="1" items={items} onChange={this.onChangeTabs} />
          </Online>

          <Offline>
            <Space className="main">
              <Alert className="alert" message="No Internet connection" description="Try again later..." type="error" />
            </Space>
          </Offline>
        </section>
      </MovieServiceContext.Provider>
    )
  }
}
