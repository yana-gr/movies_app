import React, { Component } from 'react'
import { Pagination } from 'antd'

import SearchForm from '../search-form'
import ItemList from '../item-list'
import './search-page.css'

export default class SearchPage extends Component {
  render() {
    const { filmData, loading, filmSearch, onChangePage, totalNumberOfMovies, isModalOpen, handleOk, guestSessionID } =
      this.props

    return (
      <section className="search-page">
        <SearchForm filmSearch={filmSearch} loading={loading} isModalOpen={isModalOpen} handleOk={handleOk} />
        <ItemList className="item-list" filmData={filmData} loading={loading} guestSessionID={guestSessionID} />
        <Pagination
          className="pages"
          defaultCurrent={1}
          total={totalNumberOfMovies}
          showSizeChanger={false}
          onChange={onChangePage}
          pageSize={20}
        />
      </section>
    )
  }
}
