import axios from 'axios'

//ACTION TYPES:
const GOT_USERS = 'GOT_USERS'

//ACTION CREATOR:
const gotUsers = users => ({
  type: GOT_USERS,
  users
})

//THUNK:
export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = []

//REDUCER:
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS:
      return action.users
    default:
      return state
  }
}
