/*
 * This file is executed, before jest runs tests
 */

import JestWebsocketMock from 'jest-websocket-mock'
import 'jest-localstorage-mock'
import 'jsdom-global/register'
import '@testing-library/jest-dom'

import { settings } from '../src/settings'

// Mock a websocket server
new JestWebsocketMock(settings.api.websocket)

// Mock broadcast channel
jest.mock('broadcast-channel')

// Preload React, since it is resolved via provide plugin
globalThis.React = require('react')

// Tell jest/react that current environment is an act environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true
