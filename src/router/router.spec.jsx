import 'jsdom-global/register'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'

import { AppRouter } from './router'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  settings: {
    theme: 'light',
    letterSize: 'medium',
  },
}

// Test Suite
describe('router component', () => {
  beforeAll(() => {
    // Throw error when component throws error
    jest.spyOn(console, 'error').mockImplementation((error) => {
      throw error
    })
  })

  test('the element has gotten state property "settings.theme"', () => {
    const store = mockStore(mockInitialState)
    const wrapper = shallow(<AppRouter store={store} />).children()
    expect(wrapper.props().reduxState.settings.theme).toBe(mockInitialState.settings.theme)
  })
})
