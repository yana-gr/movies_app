import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Space, Alert, Pagination } from 'antd'

import TabsApp from '../tabs-app'
import SearchForm from '../search-form'
import ItemList from '../item-list'
import MovieService from '../../services/movie-service'
import './app.css'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    filmData: [],
    loading: true,
    error: false,
    totalPages: 0,
    filmTitleSearch: '',
  }

  // componentDidMount() {
  //   this.filmSearch()
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.filmData !== prevProps.filmData) {
  //     this.onChangePage()
  //   }
  // }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  onChangePage = (e) => {
    if (this.state.filmTitleSearch !== '') {
      this.setState({ loading: true })
      this.movieService
        .getSearchMovies(e, this.state.filmTitleSearch)
        .then((filmData) => {
          this.setState({ filmData, loading: false })
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
        this.setState({ filmData, loading: false })
      })
      .catch(this.onError)
  }

  render() {
    const { filmData, loading, error, totalPages, filmTitleSearch } = this.state
    const totalNumberOfMovies = totalPages * 20

    if (filmData.length === 0 && !filmTitleSearch === '') {
      return (
        <section className="main">
          <Space>
            <Alert
              className="alert"
              message="Try again"
              description="There are no movies. Enter another movie title"
              type="info"
              showIcon
            />
          </Space>
        </section>
      )
    }

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
        <Online>
          <section className="header">
            <TabsApp />
            <SearchForm filmSearch={this.filmSearch} loading={loading} />
            <ItemList films={filmData} loading={loading} />
            <Pagination
              className="pages"
              defaultCurrent={1}
              total={totalNumberOfMovies}
              showSizeChanger={false}
              onChange={this.onChangePage}
              pageSize={20}
            />
          </section>
        </Online>

        <Offline>
          <Space>
            <Alert className="alert" message="No Internet connection" description="Try again later..." type="error" />
          </Space>
        </Offline>
      </section>
    )
  }
}
