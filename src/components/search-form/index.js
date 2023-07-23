import React, { Component } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./search-form.css";

export default class SearchForm extends Component {
  render() {
    return (
      <Space.Compact className="search-form">
        <Input
          addonBefore={<SearchOutlined />}
          placeholder="Type to search..."
        />
      </Space.Compact>
    );
  }
}
