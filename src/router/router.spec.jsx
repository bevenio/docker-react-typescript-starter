import configureMockStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

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

  test('the router uses the theme from redux and applies it to the html tag', () => {
    const store = mockStore(mockInitialState)
    render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
    expect(Helmet.peek().htmlAttributes['color-scheme']).toBe('light')
  })
})
