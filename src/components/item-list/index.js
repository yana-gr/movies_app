import React, { Component } from "react";

import Item from "../item";
import "./item-list.css";

export default class ItemList extends Component {
  render() {
    const { films, loading } = this.props;

    const elements = films.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id} className="film">
          <Item {...itemProps} loading={loading} />
        </li>
      );
    });
    return <ul className="item-list">{elements}</ul>;
  }
}
