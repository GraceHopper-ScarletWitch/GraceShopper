import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProductReducer from './singleProduct'
import allProductsReducer from './allProducts'
import cartReducer from './cart'
import allUsersReducer from './allUsers'
import singleUserReducer from './singleUser'

const reducer = combineReducers({
  user,
  singleProduct: singleProductReducer,
  allProducts: allProductsReducer,
  cart: cartReducer,
  allUsers: allUsersReducer,
  singleUser: singleUserReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
