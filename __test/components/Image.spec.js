/* eslint-env mocha */
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import { spy } from 'sinon'
import rewire from 'rewire'

const {renderIntoDocument} = ReactTestUtils

// require babel plugin "add-module-exports". For more details:
// http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default
const ImageComponent = rewire('../../shared/components/Image')

describe('Image', () => {
  it('invokes callback when the image is loaded', done => {
    const handleLoad = spy()
    const ImageMock = function () {
      setTimeout(() => {
        this.onload()
        expect(handleLoad).to.have.been.called
        done()
      }, 0)
    }

    ImageComponent.__set__('window.Image', ImageMock)
    renderIntoDocument(
      <ImageComponent src='image.png' onLoad={handleLoad} />
    )
  })
})
