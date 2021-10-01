class LoggingService {
  /* Constant properties */
  LEVELS = {
    DEBUG: { VALUE: 0, COLOR: '#6bb371' },
    LOG: { VALUE: 1, COLOR: '#2992a5' },
    WARN: { VALUE: 2, COLOR: '#ccc674' },
    ERROR: { VALUE: 3, COLOR: '#d64b4b' },
  }

  /* Private properties */
  selectedName = 'DEFAULT'
  selectedLevel = 0

  /* Class implementation */
  constructor(name, level) {
    this.changeName(name)
    this.changeLevel(level)
  }

  changeName(name) {
    if (name && typeof name === 'string') {
      this.selectedName = name.toUpperCase()
    }
  }

  changeLevel(level) {
    if (level && typeof level === 'string' && !!this.LEVELS[level.toUpperCase()]) {
      this.selectedLevel = this.LEVELS[level.toUpperCase()].VALUE
    }
  }

  modifiedPrefixStyle = (name, level) => `%c${name}%c[${level}]`

  modifiedLevelStyle = (color) =>
    `
    color: ${color};
    background-color: #000000;
    padding-left: 2px;
    padding-right: 2px;
    vertical-align: bottom;
    `

  modifiedNameStyle = () =>
    `
    background-color: #000000;
    padding-left: 2px;
    padding-right: 2px;
    `

  /* Exposed functions/methods */
  get debug() {
    if (this.selectedLevel > this.LEVELS.DEBUG.VALUE) return () => {}
    return window.console.log
      .bind(window.console, this.modifiedPrefixStyle(this.selectedName, 'DEBUG'))
      .bind(window.console, this.modifiedNameStyle())
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.DEBUG.COLOR))
  }

  get log() {
    if (this.selectedLevel > this.LEVELS.LOG.VALUE) return () => {}
    return window.console.log
      .bind(window.console, this.modifiedPrefixStyle(this.selectedName, 'LOG'))
      .bind(window.console, this.modifiedNameStyle())
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.LOG.COLOR))
  }

  get warn() {
    if (this.selectedLevel > this.LEVELS.WARN.VALUE) return () => {}
    return window.console.warn
      .bind(window.console, this.modifiedPrefixStyle(this.selectedName, 'WARN'))
      .bind(window.console, this.modifiedNameStyle())
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.WARN.COLOR))
  }

  get error() {
    if (this.selectedLevel > this.LEVELS.ERROR.VALUE) return () => {}
    return window.console.error
      .bind(window.console, this.modifiedPrefixStyle(this.selectedName, 'ERROR'))
      .bind(window.console, this.modifiedNameStyle())
      .bind(window.console, this.modifiedLevelStyle(this.LEVELS.ERROR.COLOR))
  }
}

export default LoggingService
