import 'jsdom-global/register'
import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'

import ConnectedRoot from './root'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  appearance: {
    theme: 'light',
    letterSize: 'medium',
  },
}

// Test Suite
describe('root component', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element has gotten state property "appearance.theme"', () => {
    const store = mockStore(mockInitialState)
    const wrapper = shallow(<ConnectedRoot store={store} />).children()
    expect(wrapper.props().reduxState.appearance.theme).toBe(
      mockInitialState.appearance.theme
    )
  })
})
