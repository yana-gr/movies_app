import React, { Component } from 'react'
import { Typography, Space, Spin, Rate, Progress } from 'antd'

import { MovieServiceContext } from '../movie-service-context'
import MovieService from '../../services/movie-service'

import outOfPosterImg from './film_img_instead.png'

import './item.css'

const { Title, Text } = Typography

export default class Item extends Component {
  static contextType = MovieServiceContext

  movieService = new MovieService()

  state = {
    strokeColor: '',
    ratingValue: { id: '', value: 0 },
    valueStars: '',
  }

  changeColor = (rating) => {
    if (rating > 0 && rating <= 3) {
      this.setState({ strokeColor: '#E90000' })
    }
    if (rating > 3 && rating <= 5) {
      this.setState({ strokeColor: '#E97E00' })
    }
    if (rating > 5 && rating <= 7) {
      this.setState({ strokeColor: '#E9D100' })
    }
    if (rating > 7) {
      this.setState({ strokeColor: '#66E900' })
    }
  }

  componentDidMount() {
    this.showMovieRating()
  }

  setMovieRating = (rate) => {
    const { guestSessionID, id } = this.props

    this.setState({
      ratingValue: { id, value: rate },
      valueStars: rate,
    })

    // if (rate === 0) movieService.deleteRateMovie(id, guestSessionId)
    this.movieService.setMovieRating(id, guestSessionID, rate)
  }

  showMovieRating = () => {
    const { ratingFilm, averageRatingFilm, id } = this.props
    this.setState({
      ratingValue: { id, value: averageRatingFilm },
    })

    if (typeof ratingFilm !== 'undefined') {
      this.setState({ valueStars: ratingFilm })
      this.changeColor(ratingFilm)
    }
    this.changeColor(averageRatingFilm)

    // if (typeof ratingFilm !== 'undefined') {
    //   this.setState({
    //     ratingValue: { id, value: ratingFilm },
    //     valueStars: ratingFilm,
    //   })
    //   this.changeColor(ratingFilm)
    // } else {
    //   this.setState({
    //     ratingValue: { id, value: averageRatingFilm },
    //   })
    //   this.changeColor(averageRatingFilm)
    // }
  }

  imageOnError = (event) => {
    // eslint-disable-next-line
    event.currentTarget.src = outOfPosterImg
  }

  render() {
    const { title, dateFilm, aboutFilm, loading, posterFilmUrl, genreFilm } = this.props
    const genres = this.context

    const genreNames = genreFilm.map((ID) => {
      const genresByID = genres.find((genre) => genre.id === ID)
      const genreName = genresByID.name
      return (
        <Text key={ID} keyboard>
          {genreName}
        </Text>
      )
    })

    if (loading) {
      return (
        <div className="film-about">
          <Space className="spinner-space" size="middle">
            <Spin className="spinner" />
          </Space>
        </div>
      )
    }

    return (
      <>
        <img className="film-picture" src={posterFilmUrl} onError={this.imageOnError} alt="film" />

        <div className="film-about">
          <div className="film-header">
            <Title className="film-name" level={5}>
              {title}
            </Title>
            <Space wrap>
              <Progress
                className="film-rating-circle"
                type="circle"
                percent={this.state.ratingValue.value * 10}
                size={34}
                format={(percent) => Number(`${percent / 10}`).toFixed(1)}
                strokeColor={this.state.strokeColor}
                strokeWidth={4}
              />
            </Space>
          </div>
          <Text className="film-date" type="secondary">
            {dateFilm}
          </Text>
          <ul className="film-genres">{genreNames}</ul>
          <Text className="film-description">{aboutFilm}</Text>
          <Rate
            className="film-rating"
            count={10}
            allowHalf
            defaultValue={0}
            value={this.state.valueStars}
            onChange={(rate) => {
              this.setMovieRating(rate)
              this.changeColor(rate)
            }}
          />
        </div>
      </>
    )
  }
}
