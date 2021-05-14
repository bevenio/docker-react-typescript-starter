import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ConnectedGameRoute } from './game'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  game: {
    currentGame: {
      status: 'READY',
    },
    currentGuesses: [
      {
        from: 'Tester',
        received: true,
        content: 'I am a test guess',
      },
    ],
  },
}

// Test Suite
describe('Game Route', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element does render', () => {
    const store = mockStore(mockInitialState)
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedGameRoute />
      </Provider>
    )
    expect(wrapper.children().length).toBe(1)
  })
})
