import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { IUserInfo } from '../../../../store/auth/types'
import { checkAuth } from '../../../../store/auth/actions'
import api from 'api/baseApi';

const Wrapper = styled.div`
  display: flex;
  position: relative;
`
const InputLabel = styled.label`
  position: absolute;
  top: 0;
  padding: 0 0 1px 20px;
  transition: all 200ms;
  opacity: 0.5;
  color: #92929d;
`
const InputText = styled.input`
  z-index: 1;
  width: 320px;
  height: 38px;
  border: 1px solid #f1f1f5;
  box-sizing: border-box;
  border-radius: 15px;
  background: #fafafb;
  padding: 0 20px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #92929d;
  :focus {
    outline: none;
    ::placeholder {
      opacity: 0;
    }
  }
  :focus + ${InputLabel} {
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
    opacity: 1;
    color: #fc5a5a;
  }
`
const InputSubmit = styled.input`
  width: 320px;
  height: 38px;
  background: #0062ff;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const WrapperVisitor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextVisitor = styled.span`
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

const InputLabelVisitor = styled.label`
  padding: 0 0 1px 20px;
  opacity: 1;
  font-size: 75%;
  color: #fc5a5a;
`

interface IFormSubmitProps {
  checkAuth: typeof checkAuth
}

interface ILogin {
  email: string
  password: string
}

const Sumbit: React.FC<IFormSubmitProps> = props => {
  const { checkAuth } = props

  const [redirect, setRedirect] = React.useState<boolean>(false)
  const [error, setError] = React.useState('')
  const [errorVisitor, setErrorVisitor] = React.useState('')

  const renderRedirect = (): object | void => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    request(email, password);
  }

  const handleVisitorSubmit = () => {
    request('visitor@visitor.de', 'visitor')
  }

  const request = (email: string, password: string): void => {
    api().get('/sanctum/csrf-cookie').then(() =>
      api().post<IUserInfo>('/login', { email, password })
        .then((response) => {
          setError('');
          setErrorVisitor('');
          checkAuth({ name: response.data.name, isAdmin: response.data.isAdmin })
          setRedirect(true)
        }
        ).catch(
          response => setErrorVisitor(response.response.data.message)
        ))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <InputText
            type='email'
            placeholder='Your login'
            name='email'
            value='admin@admin.de'
          />
        </Wrapper>
        <Wrapper>
          <InputText
            type='password'
            placeholder='Your password'
            name='password'
            value='admin'
          />
          <InputLabel>
            {error}
          </InputLabel>
        </Wrapper>
        <InputSubmit
          type='submit'
          value='Sign in'
          disabled={false}
        />
        {renderRedirect()}
      </form>
      <WrapperVisitor>
        <TextVisitor>or</TextVisitor>
        <ButtonVisitor onClick={handleVisitorSubmit}>
          <span>Continue as Visitor</span>
        </ButtonVisitor>
        <InputLabelVisitor>
          {errorVisitor}
        </InputLabelVisitor>
      </WrapperVisitor>
    </>
  )
}

const mapDispatchToProps = {
  checkAuth
}

export default connect(
  null,
  mapDispatchToProps
)(Sumbit)