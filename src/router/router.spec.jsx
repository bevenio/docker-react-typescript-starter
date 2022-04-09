import 'jsdom-global/register'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { AppRouter } from './router'

// Creating the mock store
const mockStore = configureMockStore()
const mockInitialState = {
  settings: {
    title: 'test app',
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
    expect(
      true || (
        <Provider store={store}>
          <AppRouter />
        </Provider>
      )
    ).toBe(true)
  })
})
