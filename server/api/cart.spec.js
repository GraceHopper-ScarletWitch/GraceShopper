/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const User = db.model('user')
const Product = db.model('product')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    beforeEach(() => {
      return Cart.create({active: true})
    })

    it('GET /api/cart/:id', async () => {
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.active).to.be.equal(true)
    })

    it('can associate a user to the created cart', async () => {
      const currentCart = await Cart.create({active: true})
      const newUser = await User.create({
        name: 'Cody',
        email: 'cody@email.com',
        password: '123'
      })
      await currentCart.setUser(newUser.id)
      expect(currentCart.userId).to.be.equal(newUser.id)
    })

    it('can add one item to the cart PUT /api/cart/:id', async () => {
      const newProduct = await Product.create({
        size: 'small',
        color: 'red',
        cut: 'skinny',
        price: 20.0,
        inventory: 10
      })
      const res = await request(app)
        .put('/api/cart/1')
        .send({
          productId: newProduct.id
        })
        .expect(200)
      expect(res.body.products.length).to.be.equal(1)
      expect(res.body.products[0].id).to.be.equal(newProduct.id)
    })

    it('can add different items to the cart PUT /api/cart/:id', async () => {
      const newProduct = await Product.create({
        size: 'small',
        color: 'red',
        cut: 'skinny',
        price: 20.0,
        inventory: 10
      })
      const secondNewProduct = await Product.create({
        size: 'small',
        color: 'blue light wash',
        cut: 'skinny',
        price: 30.0,
        inventory: 10
      })
      await request(app)
        .put('/api/cart/1')
        .send({
          productId: newProduct.id
        })
        .expect(200)
      await request(app)
        .put('/api/cart/1')
        .send({
          productId: secondNewProduct.id
        })
        .expect(200)
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)
      expect(res.body.products.length).to.be.equal(2)
      expect(res.body.products[1].id).to.be.equal(secondNewProduct.id)
    })

    it('can add one item to the cart multiple times PUT /api/cart/:id', async () => {
      const newProduct = await Product.create({
        size: 'small',
        color: 'red',
        cut: 'skinny',
        price: 20.0,
        inventory: 10
      })
      await request(app)
        .put('/api/cart/1')
        .send({
          productId: newProduct.id
        })
        .expect(200)
      await request(app)
        .put('/api/cart/1')
        .send({
          productId: newProduct.id
        })
        .expect(200)
      await request(app)
        .put('/api/cart/1')
        .send({
          productId: newProduct.id
        })
        .expect(200)
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)
      expect(res.body.products.length).to.be.equal(1)
      expect(res.body.products[0].id).to.be.equal(newProduct.id)
      expect(res.body.products[0].cartProducts.quantity).to.be.equal(3)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
