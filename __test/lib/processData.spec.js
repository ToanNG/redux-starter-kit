/* eslint-env mocha */
import { expect } from 'chai'

import process from '../../shared/lib/processData'

describe('library', () => {
  describe('processData', () => {
    it('returns new object based on the input mapper', () => {
      const post = {
        id: 1,
        name: 'Star Wars: The Force Awakens'
      }
      const postMapper = {
        id: 'id',
        title: 'name',
        createdAt: () => new Date()
      }
      const processedPost = process(post, postMapper)

      expect(processedPost).to.have.property('title').that.equals('Star Wars: The Force Awakens')
      expect(processedPost).to.have.property('createdAt').and.be.an.instanceof(Date)
    })

    it('checks type of arguments', () => {
      expect(process).to.throw(Error)
      expect(process.bind(null, {}, { id: 1 })).to.throw(Error)
      expect(process.bind(null, null, { id: 'id' })).to.throw(Error)
    })
  })
})
