'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'murphy', email: 'murphy@email.com', password: '123'})
  ])
  console.log(`created ${users.length} users`)
  const products = [
    {
      imageUrl: '/red-skinny.jpg',
      size: 'small',
      color: 'red',
      cut: 'skinny',
      price: 1900,
      inventory: 10
    },
    {
      imageUrl: '/blue-lightwash-skinny.jpg',
      size: 'small',
      color: 'blue light wash',
      cut: 'skinny',
      price: 2900,
      inventory: 10
    },
    {
      imageUrl: '/blue-darkwash-ripped.webp',
      size: 'medium',
      color: 'blue dark wash',
      cut: 'ripped',
      price: 2900,
      inventory: 10
    },
    {
      imageUrl: '/floral-skinny.jpg',
      size: 'large',
      color: 'floral',
      cut: 'skinny',
      price: 3000,
      inventory: 10
    },
    {
      imageUrl: '/pink-skinny.webp',
      size: 'large',
      color: 'pink',
      cut: 'skinny',
      price: 3400,
      inventory: 10
    },
    {
      imageUrl: '/black-bootcut.webp',
      size: 'small',
      color: 'black',
      cut: 'bootcut',
      price: 2900,
      inventory: 10
    }
  ]

  const createdProducts = await Product.bulkCreate(products, {returning: true})

  console.log(`created ${createdProducts.length} products`)
  //hook for adding together $
  const carts = [
    {
      subTotal: 0
    },
    {
      subTotal: 0
    }
  ]

  const createdCarts = await Cart.bulkCreate(carts, {returning: true})
  await createdCarts[0].addProduct(createdProducts[0])
  await createdCarts[0].addProduct(createdProducts[1])
  await createdCarts[0].addProduct(createdProducts[2])

  await createdCarts[0].save()

  console.log(`created ${createdCarts.length} carts`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
