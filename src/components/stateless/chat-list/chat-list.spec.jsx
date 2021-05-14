import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { ChatBubble } from '@/components/stateless/chat-bubble/chat-bubble'
import { ChatList } from './chat-list'

// Test Suite
describe('Chat Bubble', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders its children correctly', () => {
    const wrapper = mount(
      <ChatList>
        <ChatBubble received>Hallo</ChatBubble>
        <ChatBubble>Ciao</ChatBubble>
      </ChatList>
    ).children()
    expect(wrapper.props().children.length).toBe(2)
    expect(wrapper.props().children[0].props.children).toBe('Hallo')
    expect(wrapper.props().children[1].props.children).toBe('Ciao')
  })
})
