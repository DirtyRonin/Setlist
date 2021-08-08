import React from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'



import Logo from '../common/logo'
import LoginForm from '../login/form'
import LoginMenu from '../login/menu'

const GlobalStyle = createGlobalStyle`
  body {
  background-color: #0062ff;
}
`
const Section = styled.section`
  height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const logoProps = {
  title: {
    size: 26,
    color: 'white',
    text: 'Square'
  },
  image: {
    size: 50,
    color: 'white'
  }
}

const Login = () => {
    return (
      <>
        <GlobalStyle />
        <Section>
          <Logo {...logoProps} />
          <LoginForm />
          <LoginMenu />
        </Section>
      </>
    )
  }
  
  export default Login