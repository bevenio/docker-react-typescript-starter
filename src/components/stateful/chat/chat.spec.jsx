import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import ConnectedDemo from './chat'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  game: {
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
describe('chat component', () => {
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
        <ConnectedDemo />
      </Provider>
    )
    expect(wrapper.children().length).toBe(1)
  })
})
