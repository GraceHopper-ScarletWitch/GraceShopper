import {expect} from 'chai'
import {getProduct} from './singleProduct'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('singleProduct thunk creators', () => {
  let store
  let mockAxios

  const initialState = {singleProduct: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProduct', () => {
    it('eventually dispatches the GOT_PRODUCT action', async () => {
      const fakeProduct = {size: 'medium'}
      mockAxios.onGet('/api/products/1').replyOnce(200, fakeProduct)
      await store.dispatch(getProduct(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })
})
