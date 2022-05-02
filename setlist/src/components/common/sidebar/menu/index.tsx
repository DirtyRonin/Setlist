import React from 'react'
import styled from 'styled-components'
import Item from './item'
import IconTasks from '../../icons/menu/tasks'
import ErrorBoundary from '../../errorBoundary'
import IconMessages from '../../icons/menu/messages'
import IconSchedule from '../../icons/menu/schedule'
import IconActivity from '../../icons/menu/activity'
import IconSettings from '../../icons/menu/settings'
import IconDashboard from '../../icons/menu/dashboard'

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  @media (max-width: 620px) {
    margin-top: 40px;
  }
`

const itemsData = [
  {
    name: 'Custom Event',
    icon: IconDashboard(),
    link: '/'
  },
  // {
  //   name: 'Messages',
  //   icon: IconMessages(),
  //   link: '/messages'
  // },
  {
    name: 'Songs',
    icon: IconTasks(),
    link: '/songs'
  },
  {
    name: 'Bands',
    icon: IconTasks(),
    link: '/bands'
  },
  {
    name: 'Setlist',
    icon: IconTasks(),
    link: '/setlist'
  },
  {
    name: 'Location',
    icon: IconSchedule(),
    link: '/location'
  },
  {
    name: 'Dashboard',
    icon: IconActivity(),
    link: '/dashboard'
  },
  {
    name: 'Settings',
    icon: IconSettings(),
    link: '/settings'
  }
]

interface IItemProps {
  name: string
  icon: object | string
  link: string
}

const items = itemsData.map((item: IItemProps, idx: number): object => (
  <Item key={idx} {...item} />
))

const Menu = () => {
  return (
    // <ErrorBoundary>
      <Wrapper>{items}</Wrapper>
    // </ErrorBoundary>
  )
}

export default Menu