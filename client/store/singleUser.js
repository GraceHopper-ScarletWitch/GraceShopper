import axios from 'axios'

//ACTION TYPES:
const GOT_SINGLE_USER = 'GOT_SINGLE_USER'

//ACTION CREATOR:
const gotSingleUser = user => ({
  type: GOT_SINGLE_USER,
  user
})

//THUNK:
export const getSingleUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(gotSingleUser(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {}

//REDUCER:
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_SINGLE_USER:
      return action.user
    default:
      return state
  }
}
