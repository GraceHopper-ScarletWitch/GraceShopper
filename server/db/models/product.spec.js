/* global describe beforeEach it */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('not null values', () => {
      it('throws a validation error if size is null', async () => {
        const newProduct = {
          imageUrl: '/floral-skinny.jpg',
          color: 'floral',
          cut: 'skinny',
          price: 30.0,
          inventory: 10
        }
        await expect(
          Product.create(newProduct),
          "We shouldn't be able to create a new product without a size"
        ).to.be.rejected
      })

      it('throws a validation error if cut is null', async () => {
        const newProduct = {
          imageUrl: '/floral-skinny.jpg',
          size: 'small',
          color: 'floral',
          price: 30.0,
          inventory: 10
        }
        await expect(
          Product.create(newProduct),
          "We shouldn't be able to create a new product without a cut"
        ).to.be.rejected
      })
    }) // end describe('correctPassword')
    describe('ENUM values', () => {
      it('throws a validation error if value entered is not on the specified list', async () => {
        const newProduct = {
          imageUrl: '/blue-darkwash-ripped.webp',
          size: 'xsmall',
          color: 'blue dark wash',
          cut: 'ripped',
          price: 30.0,
          inventory: 10
        }
        await expect(
          Product.create(newProduct),
          "We shouldn't be able to create a new product that doesn't match the listed specifications"
        ).to.be.rejected
      })
      it('throws a validation error if value entered is not on the specified list', async () => {
        const newProduct = {
          imageUrl: '/blue-darkwash-ripped.webp',
          size: 'xsmall',
          color: 'blue dark wash',
          cut: '',
          price: 30.0,
          inventory: 10
        }
        await expect(
          Product.create(newProduct),
          "We shouldn't be able to create a new product that doesn't match the listed specifications"
        ).to.be.rejected
      })
    }) // end describe('ENUM values)
  }) // end describe('validations')
}) // end describe('Product model')
