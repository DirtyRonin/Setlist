import React, { ErrorInfo } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.span`
  color: #92929d;
`
const Details = styled.details`
  margin-top: 10px;
  color: #92929d;
  white-space: pre-wrap;
  font-size: 10px;
`
interface State {
    error: Error,
    errorInfo: ErrorInfo
}

class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.state = { error: {} as Error, errorInfo: {} as ErrorInfo }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <Wrapper>
                    <Title>Oops, something went wrong</Title>
                    <Details>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </Details>
                </Wrapper>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary