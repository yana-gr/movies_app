import { Tabs } from 'antd'

import './tabs-app.css'

export default function TabsApp() {
  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]

  return <Tabs defaultActiveKey="1" items={items} />
}
