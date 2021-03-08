import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {sendUserInfo} from '../store/user'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phone: '',
      email: ''
    }
    this.addName = this.addName.bind(this)
    this.addAddress = this.addAddress.bind(this)
    this.addPhone = this.addPhone.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  addName(evt) {
    this.setState({name: evt.target.value})
  }
  addAddress(evt) {
    this.setState({address: evt.target.value})
  }
  addPhone(evt) {
    this.setState({phone: evt.target.value})
  }
  addEmail(evt) {
    this.setState({email: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.isLoggedIn
      ? this.props.sendUserInfo(this.props.user.id, this.state)
      : console.log('order submitted!')
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
                onChange={this.addName}
                placeholder="Full Name"
              />
            </label>
            <label htmlFor="address">
              <input
                name="address"
                type="text"
                onChange={this.addAddress}
                required={true}
                placeholder="Shipping Address"
              />
            </label>
            <label htmlFor="phone">
              <input
                name="phone"
                type="text"
                onChange={this.addPhone}
                required={true}
                placeholder="Phone Number"
              />
            </label>

            {!isLoggedIn ? (
              <label htmlFor="email">
                <input
                  name="phone"
                  type="text"
                  onChange={this.addEmail}
                  required={true}
                  placeholder="Email"
                />
              </label>
            ) : null}
            <button type="submit">Submit</button>
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
  sendUserInfo: (userId, info) => dispatch(sendUserInfo(userId, info))
})

export default connect(mapState, mapDispatch)(Checkout)
