import {expect} from 'chai'
import {getAllProducts} from './allProducts'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('allProducts thunk creators', () => {
  let store
  let mockAxios

  const initialState = {AllProducts: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllProducts', () => {
    it('eventually dispatches the GOT_AllPRODUCTs action', async () => {
      const fakeProducts = [
        {
          imageUrl: '',
          size: 'small',
          cut: 'skinny',
          price: 3000,
          quantity: 10,
          color: 'blue'
        },
        {
          imageUrl: '/pink-skinny.webp',
          size: 'large',
          color: 'pink',
          cut: 'skinny',
          price: 30.0,
          inventory: 10
        },
        {
          imageUrl: '/black-bootcut.webp',
          size: 'small',
          color: 'black',
          cut: 'bootcut',
          price: 30.0,
          inventory: 10
        }
      ]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(getAllProducts(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_AllPRODUCTs')
      expect(actions[0].product).to.be.deep.equal(fakeProducts)
    })
  })
})
