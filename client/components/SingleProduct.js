import React from 'react'
import {getProduct} from '../store/singleProduct'
import {connect} from 'react-redux'

export class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <img src={product.imageUrl} alt="image of product" width={200} />
        <p>Size: {product.size}</p>
        <p>Color: {product.color} </p>
        <p>Cut: {product.cut}</p>
        <p>Price: {product.price / 100}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(getProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
