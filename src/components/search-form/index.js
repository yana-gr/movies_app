import React, { Component } from 'react'
import { Input, Space } from 'antd'
import { debounce } from 'lodash'
import { SearchOutlined } from '@ant-design/icons'

import './search-form.css'

export default class SearchForm extends Component {
  state = {
    label: '',
  }

  filmSearchDebounced = debounce(() => {
    this.props.filmSearch(this.state.label)
  }, 1000)

  onLabelChange = (e) => {
    e.preventDefault()
    this.setState({ label: e.target.value })

    this.filmSearchDebounced()
  }

  render() {
    return (
      <Space.Compact className="search-form">
        <Input
          addonBefore={<SearchOutlined />}
          placeholder="Type to search..."
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        />
      </Space.Compact>
    )
  }
}
