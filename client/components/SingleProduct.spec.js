import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let singleProduct

  beforeEach(() => {
    singleProduct = shallow(
      <SingleProduct
        product={{
          imageUrl: '',
          size: 'small',
          cut: 'skinny',
          price: 3000,
          quantity: 10,
          color: 'blue'
        }}
        match={{
          params: {}
        }}
        getProduct={() => {}}
      />
    )
  })

  it('renders the product details', () => {
    expect(singleProduct.text()).to.include('Size: small')
    expect(singleProduct.text()).to.include('Color: blue')
  })
})
