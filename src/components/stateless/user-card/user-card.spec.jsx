import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { UserCard } from './user-card'

// Test Suite
describe('User Card', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders content that was passed to "name" prop and adds an emoji', () => {
    const wrapper = mount(<UserCard name="xXx" />).children()
    expect(wrapper.props().children.length).toBe(2)
    expect(wrapper.props().children[0].props.className).toBe(
      'app-user-card-emoji'
    )
    expect(wrapper.props().children[1].props.className).toBe(
      'app-user-card-name'
    )
    expect(wrapper.props().children[1].props.children).toBe('xXx')
  })

  test('the element renders with "app-user-card-success" class when passing "success" prop as true', () => {
    const wrapper = mount(
      <UserCard name="successful" success="true" />
    ).children()
    expect(wrapper.props().className).toBe(
      'app-user-card app-user-card-success'
    )
  })
})
