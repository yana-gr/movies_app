import React, { Component } from 'react'
import { Rate } from 'antd'

import './stars-rating.css'

export default class StarsRating extends Component {
  render() {
    return <Rate className="film-rating" count={10} allowHalf defaultValue={0} />
  }
}
