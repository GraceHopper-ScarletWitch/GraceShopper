import React from 'react'
import {connect} from 'react-redux'
//fetch thunk
import {getAllProducts} from '../store/allProducts'
//not sure if we will need a link here
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  //getting our info as props from store?

  //need component did mount
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    console.log('props coming in', this.props)
    const products = this.props.products
    return (
      <div id="jeans">
        <h2>All The Awesome Jeans Are Here!</h2>

        {/* our map of jeans will go here  */}
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{width: '200px'}}
              />

              <h5>
                Style: {product.color} {product.cut}
              </h5>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}
//map state and map dispatch
const mapState = state => {
  //console.log('maptostate', state)
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProducts())
  }
}
//will need to add connection to store
export default connect(mapState, mapDispatch)(AllProducts)
