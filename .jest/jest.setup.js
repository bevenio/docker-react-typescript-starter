/*
 * This file is executed, before jest runs tests
 */

import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import JestWebsocketMock from 'jest-websocket-mock'
import 'jest-localstorage-mock'

import { settings } from '../src/settings'

// Mock a websocket server
new JestWebsocketMock(settings.api.websocket)

// Mock broadcast channel
jest.mock('broadcast-channel')

// Adapter for react
configure({ adapter: new Adapter() })
