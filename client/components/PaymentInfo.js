import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import {connect} from 'react-redux'
import {sendUserInfo} from '../store/user'

export class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.isLoggedIn
      ? this.props.sendUserInfo(this.state)
      : console.log('payment info submitted!')
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>

        <form name="checkoutPayment" onSubmit={this.handleSubmit}>
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
                id="cardExpiry"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardCVV"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>

            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>

            {isLoggedIn ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="secondary" name="saveCard" value="yes" />
                  }
                  label="Remember credit card details for next time"
                />
              </Grid>
            ) : null}
          </Grid>
        </form>
      </>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})
const mapDispatch = dispatch => ({
  sendUserInfo: info => dispatch(sendUserInfo(info))
})

export default connect(mapState, mapDispatch)(PaymentForm)
