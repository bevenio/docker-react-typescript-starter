type LogLevel = 'debug' | 'log' | 'warn' | 'error'
type LogValue = 0 | 1 | 2 | 3

interface LevelDefinition {
  value: LogValue
  color: string
}

interface LevelCollection {
  [levelName: string]: LevelDefinition
}

interface LogFunction {
  (...data: unknown[]): void
}

class LoggingService {
  /* Constant properties */

  LEVELS: LevelCollection = {
    debug: { value: 0, color: '#6bb371' },
    log: { value: 1, color: '#2992a5' },
    warn: { value: 2, color: '#ccc674' },
    error: { value: 3, color: '#d64b4b' },
  }

  /* Private properties */
  selectedLogName = 'default'
  selectedLevel: LogValue = 0
  selectedLevelName: LogLevel = 'debug'

  /* Class implementation */
  constructor(name: string, level?: LogLevel) {
    this.changeName(name)
    this.changeLevel(level || this.selectedLevelName)
  }

  changeName(name: string) {
    this.selectedLogName = name
  }

  changeLevel(level: LogLevel) {
    if (this.LEVELS[level]) {
      this.selectedLevel = this.LEVELS[level].value
    }
  }

  modifiedPrefixStyle = (name: string, level: LogLevel): string => `%c${level.toUpperCase()}%c[${name.toUpperCase()}]`

  modifiedLevelStyle = (color: string): string =>
    `
    color: ${color};
    font-weight: bold;
    background-color: #000000;
    padding-left: 2px;
    padding-right: 2px;
    `

  modifiedNameStyle = (): string =>
    `
    background-color: #000000;
    padding-left: 2px;
    padding-right: 2px;
    `

  trackButDontLog = (): undefined => undefined

  /* Exposed functions/methods */
  get debug(): LogFunction {
    if (this.selectedLevel > this.LEVELS.debug.value) return this.trackButDontLog
    return window.console.log
      .bind(window.console, this.modifiedPrefixStyle(this.selectedLogName, 'debug'))
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.debug.color))
      .bind(window.console, this.modifiedNameStyle())
  }

  get log(): LogFunction {
    if (this.selectedLevel > this.LEVELS.log.value) return this.trackButDontLog
    return window.console.log
      .bind(window.console, this.modifiedPrefixStyle(this.selectedLogName, 'log'))
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.log.color))
      .bind(window.console, this.modifiedNameStyle())
  }

  get warn(): LogFunction {
    if (this.selectedLevel > this.LEVELS.warn.value) return this.trackButDontLog
    return window.console.warn
      .bind(window.console, this.modifiedPrefixStyle(this.selectedLogName, 'warn'))
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.warn.color))
      .bind(window.console, this.modifiedNameStyle())
  }

  get error(): LogFunction {
    if (this.selectedLevel > this.LEVELS.error.value) return this.trackButDontLog
    return window.console.error
      .bind(window.console, this.modifiedPrefixStyle(this.selectedLogName, 'error'))
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.error.color))
      .bind(window.console, this.modifiedNameStyle())
  }
}

export { LoggingService }
