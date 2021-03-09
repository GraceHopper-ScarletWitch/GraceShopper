import axios from 'axios'

// ACTION TYPES
const GOT_CART = 'GOT_CART'
const GOT_GUEST_CART = 'GOT_GUEST_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

// ACTIONS CREATORS
export const gotCart = cart => {
  return {
    type: GOT_CART,
    cart
  }
}
//are we even using this....? maybe can remove
export const gotGuestCart = cart => {
  return {
    type: GOT_GUEST_CART,
    cart
  }
}

export const checkoutCart = () => {
  return {
    type: CHECKOUT_CART
  }
}

// THUNKS
export const getCart = () => {
  return async dispatch => {
    try {
      console.log('IN THE TRY')
      const {data: cart} = await axios.get(`/api/cart/`)
      console.log('AFTER AXIOS', cart)
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

export const getCheckedoutCart = () => {
  console.log('CHECKOUT THUNK CALLED')
  return async dispatch => {
    try {
      // ADD CODE TO GO TO ROUTE WHICH NEEDS TO BE UPDATED!!!
      dispatch(checkoutCart())
    } catch (error) {
      console.log('Error in the getCheckedoutCart thunk', error)
    }
  }
}

// INITIAL STATE
const intialState = {}

// REDUCER
function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case CHECKOUT_CART:
      console.log('CHECKED OUT')
      return {}
    default:
      return state
  }
}

export default cartReducer
