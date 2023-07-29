import React, { Component } from 'react'
import { Space, Alert, Pagination } from 'antd'

// import TabsApp from '../tabs-app'
import ItemList from '../item-list'
import MovieService from '../../services/movie-service'
import './rated-page.css'

export default class RatedPage extends Component {
  movieService = new MovieService()

  state = {
    filmData: [],
    loading: true,
    error: false,
    totalPages: 0,
    filmTitleSearch: 'return',
  }

  componentDidMount() {
    this.filmSearch(this.state.filmTitleSearch)
  }

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
    const { filmData, loading, error, totalPages } = this.state
    const totalNumberOfMovies = totalPages * 20

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
      <section className="rated-page">
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
    )
  }
}
