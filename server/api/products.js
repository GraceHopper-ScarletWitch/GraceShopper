const router = require('express').Router()
const {Product} = require('../db/models')
const adminMiddleware = require('./adminMiddleware')

module.exports = router

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

//GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) res.sendStatus(404)
    else res.send(product)
  } catch (err) {
    next(err)
  }
})

//POST /api/products
router.post('/', adminMiddleware, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

//PUT /api/products/:id
router.put('/:id', adminMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.update(req.body)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

//DELETE /api/products/:id
router.delete('/:id', adminMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
