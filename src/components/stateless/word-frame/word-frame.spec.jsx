import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { WordFrame } from './word-frame'

// Test Suite
describe('Word Frame', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders all character types correctly', () => {
    const characters = ['x', '_', null]
    const wrapper = mount(<WordFrame characters={characters} />).children()

    // Correct rendering of "x" character
    expect(wrapper.props().children[0].props.children).toBe('X')
    expect(wrapper.props().children[0].props.className).toBe(
      'app-word-character-frame'
    )

    // Correct rendering of "_" character
    expect(wrapper.props().children[1].props.children).toBe(undefined)
    expect(wrapper.props().children[1].props.className).toBe(
      'app-word-character-frame app-word-character-frame-space'
    )

    // Correct rendering of null character
    expect(wrapper.props().children[2].props.children).toBe('')
    expect(wrapper.props().children[2].props.className).toBe(
      'app-word-character-frame'
    )
  })
})
