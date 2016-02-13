/* eslint-env mocha */
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import { spy } from 'sinon'
import List from '../../shared/components/List'

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = ReactTestUtils

describe('List', () => {
  it('renders a list of items', () => {
    const entries = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]
    const component = renderIntoDocument(
      <List dataSource={entries} />
    )
    const items = scryRenderedDOMComponentsWithTag(component, 'li')
    expect(items.length).to.equal(3)
  })

  it('invokes callback when an item is clicked', () => {
    const entries = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]
    const handleClickItem = spy()
    const component = renderIntoDocument(
      <List dataSource={entries} onClickItem={handleClickItem} />
    )
    const items = scryRenderedDOMComponentsWithTag(component, 'li')
    Simulate.click(items[1])
    expect(handleClickItem).to.have.been.calledWith(2)
  })
})
