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
import { IUserInfo } from 'store/auth/types'

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  @media (max-width: 620px) {
    margin-top: 40px;
  }
`

const itemsData: IItemProps[] = [
  {
    name: 'Concerts',
    icon: IconDashboard(),
    link: '/',
    needPermission: false
  },
  // {
  //   name: 'Messages',
  //   icon: IconMessages(),
  //   link: '/messages',
  //   needPermission:true
  // },
  {
    name: 'Songs',
    icon: IconTasks(),
    link: '/songs',
    needPermission: true
  },
  {
    name: 'Bands',
    icon: IconTasks(),
    link: '/bands',
    needPermission:true
  },
  // {
  //   name: 'Setlist',
  //   icon: IconTasks(),
  //   link: '/setlist',
  //   needPermission:false
  // },
  {
    name: 'Location',
    icon: IconSchedule(),
    link: '/location',
    needPermission:true
  },
  // {
  //   name: 'Dashboard',
  //   icon: IconActivity(),
  //   link: '/dashboard',
  //   needPermission:true
  // },
  // {
  //   name: 'Settings',
  //   icon: IconSettings(),
  //   link: '/settings',
  //   needPermission:true
  // }
]

interface IItemProps {
  name: string
  icon: object | string
  link: string
  needPermission: boolean
}

interface IMenuProps {
  user: IUserInfo
}

const generateMenuItems = (user: IUserInfo) => itemsData.map((item: IItemProps, index: number) => {
  if (item.needPermission && !user.isAdmin)
    return

  return <Item key={index} {...item} />
})



const Menu = (props: IMenuProps) => {
  return (
    // <ErrorBoundary>
    <Wrapper>{generateMenuItems(props.user)}</Wrapper>
    // </ErrorBoundary>
  )
}

export default Menu