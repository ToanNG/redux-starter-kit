/* eslint-env mocha */
import { expect } from 'chai'
import { spy, stub } from 'sinon'

import dataloader from '../../shared/middlewares/dataloader'

let createFakeStore = fakeData => ({
  getState () {
    return fakeData
  },
  dispatch (action) {
    return action
  }
})
let next = () => {}

describe('middleware', () => {
  describe('dataloader', () => {
    function getSettings () {
      return {
        types: ['GET_SETTINGS', 'GET_SETTINGS_SUCCESS', 'GET_SETTINGS_FAILURE']
      }
    }

    it('should send to the next middleware function if action has no dataloader property', () => {
      const action = { type: 'GET_POSTS' }
      const fakeStore = createFakeStore({})
      const next = spy()
      dataloader(fakeStore)(next)(action)
      expect(next).to.have.been.calledWith(action)
    })

    it('should dispatch the main action if store already has data', () => {
      const action = {
        dataloader: getSettings,
        data: state => state.setting,
        action: data => ({
          type: 'GET_POSTS'
        })
      }
      const fakeStore = createFakeStore({ setting: {} })
      spy(fakeStore, 'dispatch')
      dataloader(fakeStore)(next)(action)
      expect(fakeStore.dispatch).to.have.been.calledWith({ type: 'GET_POSTS' })
    })

    it('should dispatch the dataloader then the main action if store has no data', (done) => {
      const action = {
        dataloader: getSettings,
        data: state => state.setting,
        action: data => ({
          type: 'GET_POSTS'
        })
      }
      const fakeStore = createFakeStore({})
      stub(fakeStore, 'dispatch').returns(new Promise((resolve, reject) => resolve()))
      dataloader(fakeStore)(next)(action)
      setTimeout(() => {
        expect(fakeStore.dispatch.getCall(0).args[0]).to.deep.equal(action.dataloader())
        expect(fakeStore.dispatch.getCall(1).args[0]).to.deep.equal(action.action())
        done()
      }, 0)
    })

    it('should dispatch the dataloader once for concurrent actions', () => {
      const action1 = {
        dataloader: getSettings,
        data: state => state.setting,
        action: data => ({
          type: 'GET_POSTS'
        })
      }
      const action2 = {
        dataloader: getSettings,
        data: state => state.setting,
        action: data => ({
          type: 'GET_USERS'
        })
      }
      const fakeStore = createFakeStore({})
      stub(fakeStore, 'dispatch').returns(new Promise((resolve, reject) => resolve()))
      dataloader(fakeStore)(next)(action1)
      dataloader(fakeStore)(next)(action2)
      expect(fakeStore.dispatch).to.have.been.calledOnce
    })
  })
})
