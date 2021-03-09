const router = require('express').Router()
const {Cart, CartProducts, Product, User} = require('../db/models')
module.exports = router

// GET /api/cart/:id  update use userId <-- rewrite route to search for cart based off of userId
router.get('/:userId', async (req, res, next) => {
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

// PUT /api/cart/:cartId  <---- make more concise (less API calls/ use instanc method)
// *** can possibly be turned into an instance method **
// I feel like I can rewrite this to be more concise...
router.put('/:cartId', async (req, res, next) => {
  try {
    const currentCart = await Cart.findByPk(req.params.cartId, {
      include: Product
    })
    if (await currentCart.containsProduct(Number(req.body.productId))) {
      const productInCart = await CartProducts.findOne({
        where: {
          cartId: currentCart.id,
          productId: req.body.productId
        }
      })
      productInCart.quantity += 1
      await productInCart.save()
    } else {
      await currentCart.addProduct(req.body.productId)
    }
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

// Path to delete indiviual items? Should I make new routes for CartProducts or just include them all here?
// PUT /api/cart/removeItem/:cartId <--- Remove repeating code (if you can figure out how... )
// *** can possibly be turned into an instance method **
router.put('/removeItem/:cartId', async (req, res, next) => {
  try {
    const itemToRemove = await CartProducts.findByPk(req.body.productId)
    if (!itemToRemove) {
      res.status(404).send('not found')
    } else if (itemToRemove.quantity > 1) {
      itemToRemove.quantity -= 1
      await itemToRemove.save()
      const currentCart = await Cart.findByPk(req.params.cartId, {
        include: Product
      })
      await currentCart.save()
    } else {
      itemToRemove.destroy()
      const currentCart = await Cart.findByPk(req.params.cartId, {
        include: Product
      })
      await currentCart.save()
    }
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
