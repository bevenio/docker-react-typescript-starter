import 'jsdom-global/register'
import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'

import ConnectedDemo from './demo'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  appearance: {
    theme: 'light',
    letterSize: 'medium',
  },
  post: {
    posts: [],
  },
}

// Test Suite
describe('demo component', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element has gotten state property "appearance.theme"', () => {
    const store = mockStore(mockInitialState)
    const wrapper = shallow(<ConnectedDemo store={store} />).children()
    expect(wrapper.props().reduxState.appearance.theme).toBe(
      mockInitialState.appearance.theme
    )
  })

  test('the element renders two buttons', () => {
    const store = mockStore(mockInitialState)
    const wrapper = mount(<ConnectedDemo store={store} />)
    expect(wrapper.find('button').length).toBe(2)
  })
})
