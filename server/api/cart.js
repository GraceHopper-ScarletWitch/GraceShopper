const router = require('express').Router()
const {Cart, CartProducts, Product, User} = require('../db/models')
module.exports = router

// TODO: refactor this route so that it uses req.user instead of userId, delete userId
// TODO: to check for guest user you can see if req.user has a value
// TODO: remove check for hardcoded '1'

// GET /api/cart/:id  update use userId <-- rewrite route to search for cart based off of userId
router.get('/:userId', async (req, res, next) => {
  console.log('This is the req.user', req.user)
  console.log('USER ID', req.params.userId)
  try {
    if (req.params.userId !== '1') {
      console.log('NOT 1')
      const [userCart] = await Cart.findAll({
        include: Product,
        where: {
          userId: Number(req.params.userId),
          active: true
        }
      })
      console.log('IN THE GET ROUTE', userCart)
      res.send(userCart)
    } else if (req.params.userId === '1' && !req.session.cart) {
      console.log('IN THE ELSE IF')
      const newGuestCart = await Cart.create(req.params)
      req.session.cart = newGuestCart
      res.send(newGuestCart)
    } else {
      console.log('IN THE ELSE')
      const guestCart = await Cart.findByPk(req.session.cart.id, {
        include: Product
      })
      req.session.cart = guestCart
      res.send(guestCart)
    }

    // await currentCart.save()
  } catch (err) {
    next(err)
  }
})

// TODO: remove references to '1'
// TODO: check if authenticated (if req.user should have access to this cart)
// TODO: guest user if !req.user, you'll need to check if a session cart already exists

// POST /api/cart/
// Write route to create new cart
// somehow this needs to be linked to a user.
// First check to see if user has any active carts
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body) //userId
    console.log('IS THIS THE LOG??', newCart)
    if (req.body.userId === '1') {
      req.session.cart = newCart
    } else {
      newCart.active = true
    }
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

// TODO: remove references to '1'
// TODO: check if authenticated (if req.user should have access to this cart)
// TODO: guest user if !req.user

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
    //const productId = req.body.productId
    const productInCart = await CartProducts.findOrCreate({
      where: {
        cartId: currentCart.id,
        productId: req.body.productId
      }
    })
    console.log('findOrCreateInRoute', productInCart)

    await Cart.prototype.addProductToCart(productInCart)
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

// TODO: remove references to '1'
// TODO: check if authenticated (if req.user should have access to this cart)
// TODO: guest user if !req.user

// PUT /api/cart/checkout/:cartId
// Need to add functionality to deduct from the product "inventory" when someone purchases an item
router.put('/checkout/:cartId', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.cartId)
    currentCart.active = false
    if (req.session.cart.id === Number(req.params.cartId)) {
      req.session.cart = null
    }
    await currentCart.save()
    res.send(currentCart)
  } catch (error) {
    console.log('error in the PUT /api/cart/checkout/:id route', error)
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
