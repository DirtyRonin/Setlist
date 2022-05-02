import React from 'react'
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

const Sidebar = () => {
  return (
    <Wrapper>
      <Menu />
    </Wrapper>
  )
}

export default Sidebar