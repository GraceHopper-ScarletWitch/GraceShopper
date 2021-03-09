import React from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  getCartWithItemRemoved,
  getCartWithItemAdded
} from '../store/cart'
import {Link} from 'react-router-dom'

// get userId from state through mapStateToProps and update thunk to incorporate userId
export class Cart extends React.Component {
  // componentDidUpdate(prevProps) {
  //   const cart = this.props.cart
  //   if (!prevProps.cart.id && cart.id) {
  //     console.log('THIS PROPS USER', this.props.user.id)
  //     this.props.getCart(this.props.user.id)
  //   }
  // }

  addAnotherToCart(cartId, productId) {
    this.props.getCartWithItemAdded(cartId, productId)
  }
  removeOneFromCart(cartId, productId) {
    this.props.getCartWithItemRemoved(cartId, productId)
  }

  render() {
    console.log('PROPS IN THE CART', this.props)
    const products = this.props.cart.products
    const cart = this.props.cart
    return (
      <div>
        <h1>Cart Contents: </h1>
        {products
          ? products.length > 0
            ? products.map(product => (
                <li key={product.id} className="cart-list-item">
                  <img
                    className="cart-product-image"
                    src={product.imageUrl}
                    alt={(product.cut, product.color)}
                  />
                  <div className="product-in-cart-description">
                    <div>Cut: {product.cut}</div>
                    <div>Color: {product.color}</div>
                    <div>Size: {product.size}</div>
                    <b>Item Price: </b> ${product.price / 100}
                  </div>
                  <div className="cart-button">
                    <button
                      type="button"
                      onClick={() => this.addAnotherToCart(cart.id, product.id)}
                    >
                      +
                    </button>
                    <p> I want more! </p>
                  </div>
                  <div className="cart-product-quantity">
                    <b>I'm getting: </b>
                    <p>{product.cartProducts.quantity}</p>
                  </div>
                  <div className="cart-button">
                    <button
                      type="button"
                      onClick={() =>
                        this.removeOneFromCart(cart.id, product.id)
                      }
                    >
                      -
                    </button>
                    <p> Next time... </p>
                  </div>
                  <div className="cart-product-total-price">
                    <b>Total Price: </b>
                    <p>
                      ${product.price * product.cartProducts.quantity / 100}
                      .00
                    </p>
                  </div>
                </li>
              ))
            : 'Oh no! Your cart is empty. Time to go shopping!!'
          : 'Oh no! Your cart is empty. Time to go shopping!'}
        <h3>Subtotal: ${this.props.cart.subTotal}</h3>
        {this.props.cart.subTotal > 0 ? (
          <div>
            <h3>Make Them Mine!</h3>
            <button type="button" className="cart-checkout-button">
              <Link to="/checkout">Check Me Out!</Link>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

// Update this to userId once route has been updated!
const mapDispatchToProps = dispatch => ({
  getCart: cartId => dispatch(getCart(cartId)),
  getCartWithItemRemoved: (cartId, productId) =>
    dispatch(getCartWithItemRemoved(cartId, productId)),
  getCartWithItemAdded: (cartId, productId) =>
    dispatch(getCartWithItemAdded(cartId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
