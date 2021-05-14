import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { EmojiCard } from './emoji-card'

// Test Suite
describe('Emoji Card', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders content that was passed to "content" prop', () => {
    const wrapper = mount(<EmojiCard content="👽" />).children()
    expect(wrapper.props().children).toBe('👽')
  })

  test('the element renders as hoverable when "hoverable" prop is passed as true', () => {
    const wrapper = mount(
      <EmojiCard content="👽" hoverable="true" />
    ).children()
    expect(wrapper.props().className).toBe('app-emoji-card app-emoji-card-alt')
  })
})
