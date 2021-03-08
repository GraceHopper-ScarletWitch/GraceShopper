const router = require('express').Router()
const {Cart, CartProducts, Product} = require('../db/models')
module.exports = router

// GET /api/cart/:id  update use userId <-- rewrite route to search for cart based off of userId
router.get('/:id', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.id, {
      include: Product
    })
    // await currentCart.save()
    res.send(currentCart)
  } catch (err) {
    next(err)
  }
})

// POST /api/cart/
// Write route to create new cart
// somehow this needs to be linked to a user.
// First check to see if user has any active carts
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body) //userId
    console.log(newCart)
    res.send(newCart)
  } catch (error) {
    console.log('Error in the POST /api/cart route', error)
    next(error)
  }
})
//all users have  a cart...
// router.post('/', async (req, res, next) => {
//   try {
//     //shouldnt userId be in req.body?
//     //would cart be created when we have a new user
//so a user thats not logged in is that more a cookies kind of thingwhen it comes to holding their cart items
//     //const {}
//     //if cart exist then we look for
//     if(cart){}
//   }
//   catch(err){next(err)}}

// PUT /api/cart/:cartId  <---- make more concise (less API calls/ use instanc method)
// *** can possibly be turned into an instance method **
// I feel like I can rewrite this to be more concise...
router.put('/:cartId', async (req, res, next) => {
  try {
    //access cart and whats inside
    const currentCart = await Cart.findByPk(req.params.cartId, {
      include: Product
    })
    //Number() can be used to convert JavaScript variables to numbers
    const productId = req.body.productId
    if (await currentCart.containsProduct(Number(req.body.productId))) {
      const productInCart = await CartProducts.findOne({
        where: {
          cartId: currentCart.id,
          productId: req.body.productId
        }
      })
      // we want to update or add product
      productInCart.quantity += 1
      await productInCart.save()
    }
    // } else {
    //   await currentCart.addProduct(req.body.productId)
    // }
    //
    await Cart.prototype.addProductToCart(productId, currentCart)
    const updatedCart = await Cart.findByPk(req.params.cartId, {
      include: Product
    })
    await updatedCart.save()
    res.send(updatedCart)
  } catch (error) {
    console.log('error in the PUT /api/cart/:id route', error)
    next(error)
  }
})

// PUT /api/cart/checkout/:cartId
// Need to add functionality to deduct from the product "inventory" when someone purchases an item
router.put('/checkout/:cartId', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.cartId)
    currentCart.active = false
    await currentCart.save()
    res.send(currentCart)
  } catch (error) {
    console.log('error in the PUT /api/cart/checkout/:id route', error)
    next(error)
  }
})

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
