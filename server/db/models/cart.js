const Sequelize = require('sequelize')
const db = require('../db')
const {CartProducts} = require('./cartProducts')

const Cart = db.define('cart', {
  subTotal: {
    type: Sequelize.INTEGER, // update
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

Cart.beforeBulkCreate((carts, options) => {
  for (const cart of carts) {
    if (cart.subTotal) {
      cart.subTotal += cart.subTotal
    }
  }

  // Add `memberSince` to updateOnDuplicate otherwise it won't be persisted
  if (
    options.updateOnDuplicate &&
    !options.updateOnDuplicate.includes('subTotal')
  ) {
    options.updateOnDuplicate.push('subTotal')
  }
})

Cart.beforeSave(async cart => {
  const items = await cart.getProducts({include: CartProducts})
  let total = 0
  items.forEach(item => {
    total += +item.price * item.cartProducts.quantity
  })
  cart.subTotal = parseFloat(total).toFixed(2)
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
