import React, { PropsWithoutRef } from 'react'
import { IUserInfo } from 'store/auth/types'
import styled from 'styled-components'
import Menu from '../sidebar/menu'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  height: 92vh;
  min-height: 640px;
  padding-top:40px;
`

interface IProps {
  user: IUserInfo
  isLoggedIn: boolean
}

const Sidebar = (props: IProps) => {


  const renderSidebar = () =>
    props.isLoggedIn ? <>
      <Wrapper id="sidebarWrapper">
        <Menu 
          user={props.user} />
      </Wrapper>
    </> : <></>


  return renderSidebar()
  
}

export default Sidebar