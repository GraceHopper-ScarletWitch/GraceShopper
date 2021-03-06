import React from 'react'
import {getProduct} from '../store/singleProduct'
import {connect} from 'react-redux'
import {getCartWithItemAdded} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.addItemToCart = this.addItemToCart.bind(this)
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id)
  }

  addItemToCart(productId) {
    this.props.getCartWithItemAdded(productId)
  }

  render() {
    console.log('PROPS IN SINGLE PRODUCT', this.props)
    const product = this.props.product
    console.log('PRODUCT', product)
    const productName = product.id
      ? product.cut.toUpperCase() + ' ' + product.color.toUpperCase()
      : ''
    return (
      <div>
        <div className="single-product-container">
          <div className="single-product-image">
            <img src={product.imageUrl} alt="image of product" />
          </div>
          <div className="single-product-content">
            <h2 className="single-product-title">{productName}</h2>
            <div>Size: {product.size}</div>
            <div>Color: {product.color} </div>
            <div>Cut: {product.cut}</div>
            <div>Price: {product.price / 100}</div>
            <div>Inventory: {product.inventory}</div>
          </div>
        </div>
        <button type="button" onClick={() => this.addItemToCart(product.id)}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(getProduct(id)),
  getCartWithItemAdded: productId => dispatch(getCartWithItemAdded(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
