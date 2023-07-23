import React, { Component } from "react";
import { Typography, Space, Spin } from "antd";

import "./item.css";

const { Title, Text } = Typography;

export default class Item extends Component {
  render() {
    const { title, dateFilm, genreFilm, aboutFilm, posterFilmUrl, loading } =
      this.props;

    const genre = genreFilm.map((element) => <Text keyboard> {element}</Text>);

    if (loading) {
      return (
        <div className="film-about">
          <Space className="spinner-space" size="middle">
            <Spin className="spinner" />
          </Space>
        </div>
      );
    }

    return (
      <>
        <img className="film-picture" src={posterFilmUrl} alt="film" />
        <div className="film-about">
          <Title className="film-name" level={5}>
            {title}
          </Title>
          <Text className="film-date" type="secondary">
            {dateFilm}
          </Text>
          <ul className="film-genres">{genre}</ul>
          <Text className="film-description">{aboutFilm}</Text>
        </div>
      </>
    );
  }
}
