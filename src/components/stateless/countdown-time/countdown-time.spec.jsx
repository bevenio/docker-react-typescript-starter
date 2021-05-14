import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { CountdownTime } from './countdown-time'

// Test Suite
describe('Countdown Time', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders the proper time that was passed to the "time" prop', () => {
    const wrapper = mount(<CountdownTime time={0} />)
    expect(wrapper.props().time).toBe(0)
  })
})
