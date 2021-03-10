import React from 'react'
import {
  Face,
  MarkunreadMailbox,
  Email,
  Phone,
  Payment
} from '@material-ui/icons'
import {Grid, Paper} from '@material-ui/core'

// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const MyAccount = ({user}) => {
  return (
    <div style={{display: 'inline-block'}}>
      <br />
      <br />
      <Paper style={{padding: '20px'}} elevation={2}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item>
            <Face />
            {user.name ? user.name : 'no name provided'}
          </Grid>
          <br />
          <Grid item>
            <Email />
            {user.email}
          </Grid>
          <br />
          <Grid item>
            <Phone />
            {user.phone ? user.phone : 'no phone number provided'}
          </Grid>
          <br />
          <Grid item>
            <MarkunreadMailbox />
            Delivery:{user.delivery ? user.delivery : 'no address provided'}
          </Grid>
          <br />
          <Grid item>
            <Payment />
            Billing:
            {user.billing ? user.billing : 'no address provided'}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(MyAccount)
