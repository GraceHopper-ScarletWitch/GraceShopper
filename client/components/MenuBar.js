import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Mood from '@material-ui/icons/Mood'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined'
import Button from '@material-ui/core/Button'

import {logout} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const MenuBar = ({isLoggedIn, doLogout, isAdmin}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = evt => {
    doLogout()
    handleClick(evt)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* menu icon (currently no functionality) */}
          <Link to="/home" style={{color: 'white'}}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          {/* site name */}
          <Typography variant="h6" className={classes.title}>
            Graceful Jeans
          </Typography>

          {/* if user is logged in, render account button, else render login button  */}
          {isLoggedIn ? (
            <div>
              {/* user account button (with drop down menu) */}
              <IconButton
                aria-label="account of current user"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <Mood />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  to="/myaccount"
                  component={Link}
                  onClick={handleClose}
                >
                  My Account
                </MenuItem>
                {isAdmin ? (
                  <MenuItem
                    to="/admin/users"
                    component={Link}
                    onClick={handleClose}
                  >
                    View Users
                  </MenuItem>
                ) : null}
                <MenuItem
                  to="/orderhistory"
                  component={Link}
                  onClick={handleClose}
                >
                  Order History
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              {/* login button */}
              <Link to="/signup">
                <Button color="primary" variant="contained" disableElevation>
                  Sign Up
                </Button>
              </Link>

              <Link to="/login">
                <Button color="primary" variant="contained" disableElevation>
                  Login
                </Button>
              </Link>
            </div>
          )}

          <div>
            {/* cart button */}
            <Link to="/cart" style={{color: 'white'}}>
              <IconButton
                aria-label="cart of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                variant="contained"
              >
                <ShoppingCart />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  isAdmin: state.user.userStatus === 'admin'
})

const mapDispatch = dispatch => ({
  doLogout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(MenuBar)
