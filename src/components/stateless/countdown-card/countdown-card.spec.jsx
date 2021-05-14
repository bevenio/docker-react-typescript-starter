import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'

import { CountdownCard } from './countdown-card'

// Test Suite
describe('Countdown Card', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element renders with correct time that was passed to "time" prop', () => {
    const wrapper = mount(<CountdownCard time={0}>test</CountdownCard>)
    expect(wrapper.props().children).toBe('test')
  })
})
