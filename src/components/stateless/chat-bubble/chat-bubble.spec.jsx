import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { ChatBubble } from './chat-bubble'

// Test Suite
describe('Chat Bubble', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders as received bubble when "received" prop was passed as true', () => {
    const wrapper = mount(
      <ChatBubble received>test message</ChatBubble>
    ).children()
    expect(wrapper.props().className).toBe(
      'app-chat-bubble app-chat-bubble-received'
    )
    expect(wrapper.props().children[0]).toBe('test message')
  })

  test('the element renders as normal bubble when "received" prop was passed as false', () => {
    const wrapper = mount(
      <ChatBubble received={false}>test message</ChatBubble>
    ).children()
    expect(wrapper.props().className.includes('app-chat-bubble')).toBe(true)
    expect(wrapper.props().children[0]).toBe('test message')
  })

  test('the element renders a name when "name" prop was passed', () => {
    const wrapper = mount(
      <ChatBubble name="Peter">test message</ChatBubble>
    ).children()
    expect(wrapper.props().children[1].props.children).toBe('Peter')
  })
})
