/* global describe beforeEach it */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const {expect} = require('chai')
const db = require('../index')
const CartProduct = db.model('cartProducts')
const Cart = db.model('cart')
const Product = db.model('product')

describe('CartProduct model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    const newCart = {
      subTotal: 0
    }
    const newProduct = {
      imageUrl: '/black-bootcut.webp',
      size: 'small',
      color: 'black',
      cut: 'bootcut',
      price: 30.0,
      inventory: 10
    }

    it('quantity cannot be initialized at 0', async () => {
      await expect(
        CartProduct.create({quantity: 0}),
        "We shouldn't be able to create a cartProduct instance with a quantity of 0"
      ).to.be.rejected
    })
    it('quantity cannot be changed/ reduced to 0', async () => {
      const cart = await Cart.create(newCart)
      const product = await Product.create(newProduct)
      await cart.addProduct(product)
      await cart.save()
      const cartProduct = await CartProduct.findByPk(1)
      cartProduct.quantity = cartProduct.quantity - 1
      await expect(
        cartProduct.save(),
        "We shouldn't be able to have a cartProduct instance with a quantity of 0"
      ).to.be.rejected
    })
  }) // end describe('validations')
}) // end describe('CartProduct model')
