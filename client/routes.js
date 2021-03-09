import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me} from './store'
import SingleProduct from './components/SingleProduct'
import AllProducts from './components/AllProducts'
// import Checkout from './components/checkout-form'
import Checkout from './components/CheckoutPage'
import Cart from './components/cart'
import AllUsers from './components/AllUsers'
import {SignUp, LogIn} from './components'
import SingleUser from './components/SingleUser'
import OrderHistory from './components/OrderHistory'
import {getCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    console.log('USER?', this.props.user)
    if (this.props.user.id) {
      console.log('THRE IS A USER ID', this.props.user.id)
    } else {
      console.log('NO USER ID', this.props.user)
    }
    this.props.loadCart()
  }
  componentDidUpdate(prevProps) {
    const user = this.props.user
    console.log('IN THE UPDATE', user)
    if (!prevProps.user.id && user.id) {
      console.log('IN THE UPDATE', this.props.user)
      this.props.loadCart()
    }
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        <Route path="/orderhistory" component={OrderHistory} />
        <Route path="/home" component={AllProducts} />
        <Route exact path="/" component={AllProducts} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/admin/users" component={AllUsers} />
            <Route exact path="/admin/users/:id" component={SingleUser} />
          </Switch>
        )}
        {/* Displays our AllProducts component as a fallback */}
        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadCart() {
      dispatch(getCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
