import React from 'react'
import {connect} from 'react-redux'
//fetch thunk
import {getSingleUser} from '../store/singleUser'

export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id)
  }

  render() {
    const {singleUser} = this.props
    return (
      <div>
        <p>Name: {singleUser.name}</p>
        <p>Delivery: {singleUser.delivery}</p>
        <p>Billing: {singleUser.billing}</p>
        <p>User Status: {singleUser.userStatus}</p>
        <p>E-mail: {singleUser.email}</p>
        <p>Phone: {singleUser.phone}</p>
      </div>
    )
  }
}

const mapState = state => ({
  singleUser: state.singleUser
})

const mapDispatch = dispatch => ({
  getSingleUser: id => dispatch(getSingleUser(id))
})

export default connect(mapState, mapDispatch)(SingleUser)
