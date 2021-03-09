import React from 'react'
import {connect} from 'react-redux'
//fetch thunk
import {getAllProducts} from '../store/allProducts'
import {getGuestCart, getCart} from '../store/cart'
//not sure if we will need a link here
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  //getting our info as props from store?

  //need component did mount
  componentDidMount() {
    this.props.getAllProducts()
    if (this.props.isLoggedIn) {
      this.props.getCart(this.props.user.id) // TODO: Remove userId
    } else {
      console.log('NOT LOGGED IN')
      this.props.getCart(this.props.user.id) // TODO: Remove userId
    }
  }

  render() {
    console.log('props coming in', this.props)
    const products = this.props.products
    return (
      <div id="jeans">
        <h2>All The Awesome Jeans Are Here!</h2>
        <div className="all-products-container">
          {products.map(product => (
            <div key={product.id} className="all-products-item">
              <Link
                to={`/products/${product.id}`}
                className="all-products-content"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  // style={{width: '200px'}}
                  className="all-products-image"
                />
                <div className="all-products-style all-products-content">
                  <div>
                    Style: {product.color} {product.cut}
                  </div>
                </div>
                <div className="all-products-price all-products-content">
                  <div>Price: {product.price / 100}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
//map state and map dispatch
const mapState = state => {
  //console.log('maptostate', state)
  return {
    cart: state.cart,
    user: state.user,
    products: state.allProducts,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    getCart: userId => dispatch(getCart(userId)),
    getGuestCart: () => dispatch(getGuestCart())
  }
}
//will need to add connection to store
export default connect(mapState, mapDispatch)(AllProducts)
