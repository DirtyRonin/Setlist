import React from 'react';
import { connect } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { ILogoutAction, IUserInfo } from 'store/auth/types'
import { logout } from 'store/auth/actions'
import api from 'api/baseApi';
import { RootState } from 'store';
import { IUser } from 'models';

import { History } from 'history';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const ApBarComponent = (props: AppBarProps) => {

  const { logout, userName, isLoggedIn, history } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {

    api().post('/api/logout', { message: "logout" })
      .then((response) => {
        console.log("logged out")
        logout()
        handleClose()
        history.push({
          pathname: '/login'
        })
      }
      ).catch(
        response => ({})
      )
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            StageHand
          </Typography>
          {isLoggedIn && <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

interface IConnectedDispatch {
  logout: typeof logout
}

interface IProps {
  history: History
}

interface IState extends IProps {
  userName: string
  isLoggedIn: boolean
}

type AppBarProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState =>
({
  userName: state.auth.name,
  isLoggedIn: state.auth.isAuth,
  history: props.history
});

const mapDispatchToProps = {
  logout
}

const MenuAppBar = (props: AppBarProps) => (
  <>
    <ApBarComponent {...props} />
  </>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuAppBar)
