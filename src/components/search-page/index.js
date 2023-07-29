import React, { Component } from 'react'
import { Space, Alert, Pagination, Modal } from 'antd'

import SearchForm from '../search-form'
import ItemList from '../item-list'
import MovieService from '../../services/movie-service'
import './search-page.css'

export default class SearchPage extends Component {
  movieService = new MovieService()

  state = {
    filmData: [],
    loading: true,
    error: false,
    totalPages: 0,
    filmTitleSearch: 'return',
    isModalOpen: false,
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
        if (filmData.length === 0) {
          this.setState({ isModalOpen: true })
        }
      })
      .catch(this.onError)
  }

  // onAlertClose = () => {
  //   this.filmSearch('render')
  // }

  handleOk = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { filmData, loading, error, totalPages, isModalOpen } = this.state
    const totalNumberOfMovies = totalPages * 20

    if (isModalOpen === true) {
      return (
        <section className="main">
          <Modal
            title="Try again"
            open={isModalOpen}
            onOk={this.handleOk}
            closeIcon={false}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            <p>There are no movies. Enter another movie title</p>
          </Modal>
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
      <section className="search-page">
        <SearchForm filmSearch={this.filmSearch} loading={loading} />
        <ItemList className="item-list" films={filmData} loading={loading} />
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
