import React, { Component } from 'react'
import { Input, Space, Modal } from 'antd'
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
    const { isModalOpen, handleOk } = this.props

    if (isModalOpen === true) {
      return (
        <section className="main">
          <Modal
            title="Try again"
            open={isModalOpen}
            onOk={handleOk}
            closeIcon={false}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            <p>There are no movies. Enter another movie title</p>
          </Modal>
        </section>
      )
    }

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
