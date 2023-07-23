import React, { Component } from 'react'
import { Space, Alert } from 'antd'

import HeaderButtons from '../header-buttons'
import SearchForm from '../search-form'
import ItemList from '../item-list'
// import Footer from '../footer'
import MovieService from '../../services/movie-service'
import './app.css'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    filmData: [],
    loading: true,
    error: false,

    // filmData: [
    //   {
    //     id: 580629,
    //     title: "Get Duked!",
    //     dateFilm: "2019-03-08",
    //     genreFilm: [1, 2],
    //     aboutFilm:
    //       "One-time gangster Antoine is enjoying retirement on the coast, now managing a boating club. He receives a visit from a former accomplice who asks for a loan. The money will be repaid by a crook who is now in hiding; Antoine intends to recover his money.",
    //     posterFilmUrl: `https://image.tmdb.org/t/p/w185/b52nqFj5XrBNA7MhqcnENvFsHtx.jpg`,
    //   },
    //   {
    //     id: 580629,
    //     title: "Get Duked!",
    //     dateFilm: "2019-03-08",
    //     genreFilm: [1, 2],
    //     aboutFilm:
    //       "An anarchic, hip-hop inspired comedy that follows four city boys on a wilderness trek as they try to escape a mysterious huntsman.",
    //     posterFilmUrl: `https://image.tmdb.org/t/p/w185/b52nqFj5XrBNA7MhqcnENvFsHtx.jpg`,
    //   },
    // ],
  }

  componentDidMount() {
    this.newArrFilms()
  }

  newArrFilms() {
    this.movieService
      .getAllMovies()
      .then((filmData) => {
        this.setState({ filmData, loading: false })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  render() {
    const { filmData, loading, error } = this.state

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
      <section className="main">
        <section className="header">
          <HeaderButtons />
          <SearchForm />
        </section>
        <ItemList films={filmData} loading={loading} />
      </section>
    )
  }
}
