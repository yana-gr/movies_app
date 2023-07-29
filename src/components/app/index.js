import { Tabs } from 'antd'
// import { Offline, Online } from 'react-detect-offline'
// import {  Space, Alert } from 'antd'

import SearchPage from '../search-page'
import RatedPage from '../rated-page'

import './app.css'

export default function App() {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchPage />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedPage />,
    },
  ]

  return (
    <section>
      {/* <Online> */}
      <Tabs className="main" defaultActiveKey="1" items={items} />
      {/* </Online> */}

      {/* <Offline>
        <Space className="main">
          <Alert className="alert" message="No Internet connection" description="Try again later..." type="error" />
        </Space>
      </Offline> */}
    </section>
  )
}
