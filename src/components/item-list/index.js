import React, { Component } from 'react'

import Item from '../item'
import './item-list.css'

export default class ItemList extends Component {
  render() {
    const { filmData, loading, guestSessionID } = this.props

    const elements = filmData.map((item) => {
      const { id, ...itemProps } = item
      return (
        <li key={id} className="film">
          <Item {...itemProps} loading={loading} guestSessionID={guestSessionID} id={id} />
        </li>
      )
    })
    return <ul className="item-list">{elements}</ul>
  }
}
