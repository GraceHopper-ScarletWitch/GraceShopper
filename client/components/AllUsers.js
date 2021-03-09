import React from 'react'
import {connect} from 'react-redux'
//fetch thunk
import {getUsers} from '../store/allUsers'
//not sure if we will need a link here
import {Link} from 'react-router-dom'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        {users.map(user => (
          <div key={user.id}>
            <Link to={`/admin/users/${user.id}`}>{user.email}</Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.allUsers
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
