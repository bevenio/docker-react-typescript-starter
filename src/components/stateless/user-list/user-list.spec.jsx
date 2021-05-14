import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { UserCard } from '@/components/stateless/user-card/user-card'
import { UserList } from './user-list'

// Test Suite
describe('User Card', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders its user-card children and has the correct className "app-user-list"', () => {
    const wrapper = mount(
      <UserList>
        <UserCard name="John 1" />
        <UserCard name="John 2" success="true" />
        <UserCard name="John 3" />
      </UserList>
    ).children()

    expect(wrapper.props().children.length).toBe(3)
    expect(wrapper.props().children[0].props.name).toBe('John 1')
    expect(wrapper.props().children[1].props.name).toBe('John 2')
    expect(wrapper.props().children[2].props.name).toBe('John 3')
    expect(wrapper.props().children[1].props.success).toBe('true')
    expect(wrapper.props().className).toBe('app-user-list')
  })
})
