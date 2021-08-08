import React from 'react'
import styled from 'styled-components'
import Menu from '../sidebar/menu'
import Header from '../sidebar/header'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  height: 92vh;
  min-height: 640px;
`

const Sidebar = () => {
  return (
    <Wrapper>
      <Header />
      <Menu />
    </Wrapper>
  )
}

export default Sidebar