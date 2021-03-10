import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {sendUserInfo} from '../store/user'
import {getCheckedoutCart} from '../store/cart'
import {Link} from 'react-router-dom'

// eslint-disable-next-line no-shadow
// eslint-disable-next-line complexity
export const Checkout = ({user, isLoggedIn, sendUserInfo, checkout}) => {
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const handleChange = evt => {
    user[evt.target.name] = evt.target.value
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    isLoggedIn ? sendUserInfo(user) : console.log('order submitted!')
    setOrderSubmitted(true)
    checkout()
  }

  // eslint-disable-next-line no-use-before-define
  const classes = useStyles()
  return (
    <>
      <main className={classes.layout}>
        {!isLoggedIn ? (
          <p>
            <i>have an account?</i> <Link to="/login">Login</Link>
          </p>
        ) : null}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Full Name"
                  // value={user.name ? user.name : null}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {!isLoggedIn ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    // value={user.email ? user.email : null}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  // value={user.phone ? user.phone : null}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="delivery"
                  name="delivery"
                  label="Delivery Address"
                  // value={user.delivery ? user.delivery : null}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid> */}
            </Grid>
            <br />
            <br />
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="billing"
                  label="Billing Address"
                  // value={user.billing ? user.billing : null}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              className={classes.button}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </form>
          <br />
          <br />
          {orderSubmitted ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : null}
        </Paper>
      </main>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  checkout: () => dispatch(getCheckedoutCart()),
  sendUserInfo: info => dispatch(sendUserInfo(info))
})

export default connect(mapState, mapDispatch)(Checkout)

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))
