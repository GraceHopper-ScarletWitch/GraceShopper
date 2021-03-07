const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/products/:id', () => {
    let productId
    beforeEach(async () => {
      const product = await Product.create({
        size: 'small',
        color: 'red',
        cut: 'highrise',
        price: 2000,
        inventory: 10
      })
      productId = product.id
    })

    it('GET /api/products/:id', async () => {
      const res = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.cut).to.be.equal('highrise')
    })

    it('returns 404 if not found', async () => {
      await request(app)
        .get(`/api/products/2000`)
        .expect(404)
    })
  })
})
