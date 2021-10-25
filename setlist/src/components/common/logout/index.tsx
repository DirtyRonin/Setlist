import React from 'react'
import { connect } from 'react-redux'
import { logout } from 'store/auth/actions'

interface IProps {
    logout: typeof logout
}

const LogoutButton: React.FC<IProps> = props => {
    const { logout } = props
    const onLogoutClick = () => logout()

    return (
        <button onClick={onLogoutClick}>logout</button>
    )
}

const mapDispatchToProps = {
    logout
}

export default connect(
    null,
    mapDispatchToProps
)(LogoutButton)