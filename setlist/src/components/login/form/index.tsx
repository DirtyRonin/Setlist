import React from 'react'
import styled from 'styled-components'
import LoginVisitor from '../visitor'
import LoginFormSubmit from './submit'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 360px;
  min-width: 320px;
  height: 365px;
  background-color: white;
  border-radius: 20px;
  margin: 35px 10px 25px 10px;
`

const Form = () => {
  return (
    <Section>
      <h3>Login to your account</h3>
      <LoginFormSubmit />
      {/* <LoginVisitor /> */}
    </Section>
  )
}

export default Form