const router = require('express').Router()
const {Cart, CartProducts, Product, User} = require('../db/models')
module.exports = router

// TODO: refactor this route so that it uses req.user instead of userId, delete userId
// TODO: to check for guest user you can see if req.user has a value
// TODO: remove check for hardcoded '1'

// GET /api/cart/  update use userId <-- rewrite route to search for cart based off of userId
router.get('/', async (req, res, next) => {
  //incorporated req.user in route
  try {
    if (req.user) {
      const [userCart] = await Cart.findOrCreate({
        include: Product,
        where: {
          userId: req.user.id,
          active: true
        }
      })
      await userCart.reload()
      res.send(userCart)
    } else {
      const [guestCart] = await Cart.findOrCreate({
        include: Product,
        where: {
          guestId: req.session.id,
          active: true
        }
      })
      await guestCart.reload()
      res.send(guestCart)
    }
  } catch (err) {
    next(err)
  }
})

// TODO: remove references to '1'
// TODO: check if authenticated (if req.user should have access to this cart)
// TODO: guest user if !req.user

// PUT /api/cart/  <---- make more concise (less API calls/ use instanc method)

router.put('/', async (req, res, next) => {
  console.log('BODY', req.body.productId)
  try {
    let arr
    if (req.user) {
      arr = await Cart.findOrCreate({
        include: Product,
        where: {
          userId: req.user.id,
          active: true
        }
      })
    } else {
      arr = await Cart.findOrCreate({
        include: Product,
        where: {
          guestId: req.session.id,
          active: true
        }
      })
    }
    const cart = arr[0]
    const [productInCart, created] = await CartProducts.findOrCreate({
      where: {
        cartId: cart.id,
        productId: req.body.productId
      }
    })

    if (!created) {
      //found it and have to increment by 1
      productInCart.quantity++
      await productInCart.save()
    }
    await cart.reload() //reloads the cart from the db. get the new one if changed
    await cart.save()
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

// router.put('/', async (req, res, next) => {
//   try {
//     let arr
//     if (req.user) {
//       arr = await Cart.findOrCreate({
//         include: Product,
//         where: {
//           userId: req.user.id,
//           active: true,
//         },
//       })
//       //await userCart.reload()
//       //  res.send(userCart)
//     } else {
//       arr = await Cart.findOrCreate({
//         include: Product,
//         where: {
//           guestId: req.session.id,
//           active: true,
//         },
//       })
//     }
//     //access cart and whats inside
//     // const currentCart = await Cart.findByPk(req.params.cartId, {
//     //   include: Product,
//     // })
//     //Number() can be used to convert JavaScript variables to numbers
//     //const productId = req.body.productId
//     const cart = arr[0]
//     const productInCart = await CartProducts.findOrCreate({
//       where: {
//         cartId: cart.id,
//         productId: req.body.productId,
//       },
//     })

//     console.log('findOrCreateInRoute', productInCart)

//     await Cart.prototype.addProductToCart(productInCart)
//     const updatedCart = await Cart.findByPk(req.params.cartId, {
//       include: Product,
//     })
//     //await updatedCart.save()
//     console.log('UPDATEDcART', updatedCart)
//     res.send(updatedCart)
//   } catch (error) {
//     // console.log('error in the PUT /api/cart/:id route', error)
//     next(error)
//   }
// })

// TODO: remove references to '1'
// TODO: check if authenticated (if req.user should have access to this cart)
// TODO: guest user if !req.user

// PUT /api/cart/checkout/:cartId
// Need to add functionality to deduct from the product "inventory" when someone purchases an item
// router.put('/checkout/:cartId', async (req, res, next) => {
//   try {
//     const currentCart = await Cart.findByPk(req.params.cartId)
//     currentCart.active = false
//     if (req.session.cart.id === Number(req.params.cartId)) {
//       req.session.cart = null
//     }
//     await currentCart.save()
//     res.send(currentCart)
//   } catch (error) {
//     console.log('error in the PUT /api/cart/checkout/:id route', error)
//     next(error)
//   }
// })

router.put('/checkout', async (req, res, next) => {
  try {
    let arr
    if (req.user) {
      arr = await Cart.findOrCreate({
        include: Product,
        where: {
          userId: req.user.id,
          active: true
        }
      })
    } else {
      arr = await Cart.findOrCreate({
        include: Product,
        where: {
          guestId: req.session.id,
          active: true
        }
      })
    }
    const cart = arr[0]
    await cart.reload()
    for (let i = 0; i < cart.products.length; i++) {
      const product = cart.products[i]
      const quantity = product.cartProducts.quantity
      if (quantity > product.inventory) {
        return res.sendStatus(500)
      }
    }
    for (let i = 0; i < cart.products.length; i++) {
      const product = cart.products[i]
      const quantity = product.cartProducts.quantity
      product.inventory -= quantity
      await product.save()
    }
    cart.active = false
    await cart.save()
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

// TODO: remove references to '1'
// TODO: check if authenticated (if req.user should have access to this cart)
// TODO: guest user if !req.user

// Path to delete indiviual items? Should I make new routes for CartProducts or just include them all here?
// PUT /api/cart/removeItem/:cartId <--- Remove repeating code (if you can figure out how... )
// *** can possibly be turned into an instance method **
router.put('/removeItem/:cartId', async (req, res, next) => {
  try {
    const itemToRemove = await CartProducts.findByPk(req.body.productId)
    //we call removeProductFromCart
    //if product not found send error message
    console.log('item to remove', itemToRemove)
    if (!itemToRemove) {
      res.status(404).send('not found')
      //LINES 101 TO 115 MAY BE REMOVED IF SATISFACRORY PROTOTYPE FUNCTION
      // } else if (itemToRemove.quantity > 1) {
      //   itemToRemove.quantity -= 1
      //   await itemToRemove.save()
      //   const currentCart = await Cart.findByPk(req.params.cartId, {
      //     include: Product,
      //   })
      //   await currentCart.save()
      // } else {
      //   // if item quantity is ===1?
      //   itemToRemove.destroy()
      //   //after I destroy i want to update

      //   const currentCart = await Cart.findByPk(req.params.cartId, {
      //     include: Product,
      //   })
      //   await currentCart.save()
    }
    await Cart.prototype.removeProductFromCart(itemToRemove)
    const currentCart = await Cart.findByPk(req.params.cartId, {
      include: Product
    })
    await currentCart.save()
    res.send(currentCart)
  } catch (error) {
    console.log('Error in the PUT /api/cart/removeItem/:id route', error)
    next(error)
  }
})
