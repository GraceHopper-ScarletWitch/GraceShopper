import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let allProducts

  beforeEach(() => {
    allProducts = shallow(
      <AllProducts
        products={[
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
        ]}
        match={{
          params: []
        }}
        getAllProducts={() => {}}
      />
    )
  })

  it('renders the product details', () => {
    expect(allProducts.text().length).to.be.equal(3)
  })
})
