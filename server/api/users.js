const router = require('express').Router()
const {User} = require('../db/models')
const adminMiddleware = require('./adminMiddleware')
module.exports = router

// GET /api/users
router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    // if (!req.user || req.user.userStatus !== 'admin') return res.sendStatus(401)
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id
router.get('/:id', adminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        'name',
        'delivery',
        'billing',
        'userStatus',
        'id',
        'email',
        'phone'
      ]
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await req.user.update({
      name: req.body.name,
      delivery: req.body.delivery,
      phone: req.body.phone,
      billing: req.body.billing
    })

    res.json(req.user)
  } catch (err) {
    next(err)
  }
})
