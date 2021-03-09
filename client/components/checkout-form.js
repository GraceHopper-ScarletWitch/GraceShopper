import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {sendUserInfo} from '../store/user'
import {getCheckedoutCart} from '../store/cart'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phone: '',
      email: ''
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
      : console.log('order submitted!')
    this.props.checkout()
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    return (
      <div>
        <h1>Checkout</h1>
        {!isLoggedIn ? (
          <p>
            <i>have an account?</i> <Link to="/login">Login</Link>
          </p>
        ) : null}
        <h3>Shipping Info</h3>
        <form name="checkoutShipping" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <input
                name="name"
                type="text"
                required={true}
                onChange={this.handleChange}
                placeholder="Full Name"
              />
            </label>
            <label htmlFor="address">
              <input
                name="address"
                type="text"
                onChange={this.handleChange}
                required={true}
                placeholder="Shipping Address"
              />
            </label>
            <label htmlFor="phone">
              <input
                name="phone"
                type="text"
                onChange={this.handleChange}
                required={true}
                placeholder="Phone Number"
              />
            </label>

            {!isLoggedIn ? (
              <label htmlFor="email">
                <input
                  name="email"
                  type="text"
                  onChange={this.handleChange}
                  required={true}
                  placeholder="Email"
                />
              </label>
            ) : null}
            <button type="submit">Submit</button>

            <PaymentForm />
          </div>
        </form>
      </div>
    )
  }
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
