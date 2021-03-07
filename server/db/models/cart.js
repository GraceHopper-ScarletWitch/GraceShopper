const Sequelize = require('sequelize')
const db = require('../db')
const {CartProducts} = require('./cartProducts')

const Cart = db.define('cart', {
  subTotal: {
    type: Sequelize.DECIMAL, // update
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
// Cart.afterBulkCreate(async (cart) => {
//   console.log('afterBulkCreateProduct', cart)
//   const add = await cart.addProduct(3)
//   const items = await cart.getProducts()
//   console.log('items', items)
//   console.log('add', add)
//console.log('in the beforeBulkCreate', cart)
// for (const cart of carts) {
//   if (cart.subTotal) {
//     cart.subTotal += //procuct.price
//   }
// }

// //  updateOnDuplicate otherwise it won't be persisted
// if (
//   options.updateOnDuplicate &&
//   !options.updateOnDuplicate.includes('subTotal')
// ) {
//   options.updateOnDuplicate.push('subTotal')
// }
//})

Cart.beforeSave(async cart => {
  const items = await cart.getProducts({include: CartProducts})
  let total = 0
  items.forEach(item => {
    total += item.price * item.cartProducts.quantity
  })
  cart.subTotal = total / 100
  return cart
})

// second hook
// beforeBulkCreate ??

// optimize route to incorporate findOrCreate ??
// use findOrCreate instead of magic methods
Cart.prototype.containsProduct = async function(productId) {
  let answer = false
  const productsInCart = await this.getProducts()
  productsInCart.forEach(product => {
    if (product.id === productId) {
      answer = true
    }
  })
  return answer
}

// instance methods (adding and removing)

module.exports = Cart
