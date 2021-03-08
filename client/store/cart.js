import axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
// const GOT_ITEM_TO_ADD = 'GOT_ITEM_TO_ADD'
// const GOT_ITEM_TO_REMOVE = 'GOT_ITEM_TO_REMOVE'

// ACTIONS CREATORS
export const gotCart = cart => {
  return {
    type: GOT_CART,
    cart
  }
}

// Question: If we are always returning a cart object could we use just one action type and one action creator???

// export const gotItemToAdd = (cart) => ({
//   type: GOT_ITEM_TO_ADD,
//   cart,
// })

// export const gotItemToRemove = (cart) => ({
//   type: GOT_ITEM_TO_REMOVE,
//   cart,
// })

// We will need to find a way to get the cartId. We will probably want to look it up by user and find the user's active cart? Maybe have a variable on state somewhere to point to the active cart id?

// THUNKS
export const getCart = cartId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get(`/api/cart/${cartId}`)
      dispatch(gotCart(cart))
    } catch (error) {
      console.log('Error in the getCart thunk', error)
    }
  }
}

export const getCartWithItemAdded = (cartId, productId) => {
  console.log('THUNK CALLED')
  return async dispatch => {
    try {
      console.log('IN THE RETURN')
      const {data: cart} = await axios.put(`/api/cart/${cartId}`, {
        productId: productId
      })
      console.log('CART AFTER CALL', cart)
      dispatch(gotCart(cart))
    } catch (error) {
      console.log('Error in the getCartWithItemAdded thunk', error)
    }
  }
}

export const getCartWithItemRemoved = (cartId, productId) => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.put(`api/cart/removeItem/${cartId}`, {
        productId: productId
      })
      dispatch(gotCart(cart))
    } catch (error) {
      console.log('Error in the getCartWithItemRemved thunk', error)
    }
  }
}

// INITIAL STATE
const intialState = {}

// Or, should we divide state between subtotal, items, etc to make it easier to handle the data on the front end or are we okay with working with the entire cart object (which is pretty cumbersome)

// const initialState = {
//   subtotal: 0.00,
//   products: []  <-- this we could possibly save as an object but we would have to re-work the data coming in a little
// }

// REDUCER
function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
