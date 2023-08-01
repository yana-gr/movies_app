import React, { Component } from 'react'
import { Pagination } from 'antd'

import ItemList from '../item-list'
import './rated-page.css'

export default class RatedPage extends Component {
  render() {
    const { loading, onChangePage, totalNumberOfRatedMovies, guestSessionID, ratedFilms, currentRatedPage } = this.props
    if (ratedFilms.length !== 0)
      return (
        <section className="search-page">
          <ItemList className="item-list" filmData={ratedFilms} loading={loading} guestSessionID={guestSessionID} />
          <Pagination
            className="pages"
            current={currentRatedPage}
            defaultCurrent={1}
            total={totalNumberOfRatedMovies}
            showSizeChanger={false}
            onChange={onChangePage}
            pageSize={20}
          />
        </section>
      )
  }
}
