import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'

import { ConnectedStartRoute } from './start'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  game: {
    currentGame: {
      status: 'NONE',
    },
  },
}

// Test Suite
describe('Start Route', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element does render', () => {
    const store = mockStore(mockInitialState)
    const wrapper = mount(<ConnectedStartRoute store={store} />)
    expect(wrapper.length).toBe(1)
  })
})
