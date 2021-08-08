import React from 'react'
import { RootState } from '../../../store/reducers'
import { connect } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface IPrivateRouteProps extends RouteProps {
  auth: boolean
}

function PrivateRoute({ auth, children, ...rest }: IPrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth.isAuth
  }
}

export default connect(mapStateToProps)(PrivateRoute)