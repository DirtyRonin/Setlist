import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Text = styled.span`
  margin: 15px 0;
  color: #92929d;
  font-size: 12px;
  text-transform: uppercase;
`
const ButtonVisitor = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 38px;
  border: none;
  background: #fc5a5a;
  border-radius: 10px;
  cursor: not-allowed;
  :focus {
    outline: none;
  }
  span {
    margin-left: 10px;
    color: white;
    font-size: 12px;
  }
`

const Visitor = () => {
  return (
    <Wrapper>
      <Text>or</Text>
      <ButtonVisitor>
        <span>Continue as Visitor</span>
      </ButtonVisitor>
      
    </Wrapper>
  )
}

export default Visitor