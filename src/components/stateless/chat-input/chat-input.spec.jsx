import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { ChatInput } from './chat-input'

// Test Suite
describe('Chat Input', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element fires "onSend" prop when content is not empty and button is clicked', () => {
    let result = 'not-test'
    const mockCallback = jest.fn((value) => {
      result = value
    })
    const element = mount(<ChatInput onSend={mockCallback} />)

    // Simulate input change
    element.setState({
      value: 'test',
    })

    // Simulate button click
    element.simulate('submit')

    expect(mockCallback.mock.calls.length).toBe(1)
    expect(result).toBe('test')
  })
})
