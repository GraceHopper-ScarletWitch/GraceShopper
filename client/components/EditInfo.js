import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {sendUserInfo} from '../store/user'

// eslint-disable-next-line complexity
export const EditInfo = ({user}) => {
  const handleChange = evt => {
    user[evt.target.name] = evt.target.value
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    sendUserInfo(user)
    evt.target.reset()
  }
  const classes = useStyles()
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Account Info
        </Typography>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label={user.name ? user.name : 'Full Name'}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label={user.email ? user.email : 'Email'}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone"
                name="phone"
                label={user.phone ? user.email : 'Phone Number'}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="delivery"
                name="delivery"
                label={user.delivery ? user.delivery : 'Delivery Address'}
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
          <Button
            type="submit"
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>
  )
}

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

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  sendUserInfo: info => dispatch(sendUserInfo(info))
})

export default connect(mapState, mapDispatch)(EditInfo)
