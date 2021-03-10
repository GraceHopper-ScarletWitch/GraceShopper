const Sequelize = require('sequelize')
const db = require('../db')
const {CartProducts} = require('../models')

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
  },
  //if user not logged in this will signify which guest the cart belongs to
  guestId: {
    type: Sequelize.STRING
  }
})

// //  updateOnDuplicate otherwise it won't be persisted
// if (
//   options.updateOnDuplicate &&
//   !options.updateOnDuplicate.includes('subTotal')
// ) {
//   options.updateOnDuplicate.push('subTotal')
// }
//})

// Cart.beforeBulkCreate((carts, options) => {
//   for (const cart of carts) {
//     if (cart.subTotal) {
//       cart.subTotal += cart.subTotal
//     }
//   }

//   // Add `memberSince` to updateOnDuplicate otherwise it won't be persisted
//   if (
//     options.updateOnDuplicate &&
//     !options.updateOnDuplicate.includes('subTotal')
//   ) {
//     options.updateOnDuplicate.push('subTotal')
//   }
// })

Cart.prototype.removeProductFromCart = async function(itemToRemove) {
  //if item is found and quantity is >1 proceed to remove item
  if (itemToRemove.quantity > 1) {
    //subtract item
    itemToRemove.quantity -= 1
    //save the new state of cart
    await itemToRemove.save()
  } else {
    //else if item quantity is 1 destroy the presence of item in cart
    itemToRemove.destroy()
  }
}

Cart.beforeSave(async cart => {
  const items = await cart.getProducts({include: CartProducts})
  let total = 0
  items.forEach(item => {
    total += item.price * item.cartProducts.quantity
  })
  cart.subTotal = total / 100
  return cart
})

// optimize route to incorporate findOrCreate ??
// use findOrCreate instead of magic methods

Cart.prototype.addProductToCart = async function(productInCart) {
  //PRODUCT COMES IN AS A ARRAY
  console.log('product', typeof productInCart)
  console.log('before', productInCart[0].quantity)
  if (productInCart[1] === false) {
    productInCart[0].quantity += 1
    console.log(productInCart[0].quantity)
  }
  console.log('after', productInCart[0].quantity)
  await productInCart[0].save()
}
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

module.exports = Cart
