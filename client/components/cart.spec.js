/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('Cart', () => {
  it('renders STUFF', async () => {
    const cart = shallow(
      <Cart
        cart={{
          id: 1,
          subTotal: '3.00',
          active: false,
          createdAt: '2021-03-06T19:24:02.382Z',
          updatedAt: '2021-03-06T19:24:02.382Z',
          userId: null,
          products: [
            {
              id: 1,
              size: 'small',
              color: 'red',
              cut: 'skinny',
              price: 20,
              inventory: 10,
              imageUrl: '/red-skinny.jpg',
              createdAt: '2021-03-06T19:24:02.278Z',
              updatedAt: '2021-03-06T19:24:02.278Z',
              cartProducts: {
                quantity: 6,
                createdAt: '2021-03-06T19:24:02.428Z',
                updatedAt: '2021-03-08T03:01:13.266Z',
                productId: 1,
                cartId: 1
              }
            },
            {
              id: 2,
              size: 'small',
              color: 'blue light wash',
              cut: 'skinny',
              price: 30,
              inventory: 10,
              imageUrl: '/blue-lightwash-skinny.jpg',
              createdAt: '2021-03-06T19:24:02.278Z',
              updatedAt: '2021-03-06T19:24:02.278Z',
              cartProducts: {
                quantity: 6,
                createdAt: '2021-03-06T19:24:02.432Z',
                updatedAt: '2021-03-08T03:01:14.971Z',
                productId: 2,
                cartId: 1
              }
            }
          ]
        }}
        getCart={() => {}}
      />
    )
    expect(cart.find('h1').text()).to.include('Cart')
    expect(cart.text()).to.include('red')
  })
})
