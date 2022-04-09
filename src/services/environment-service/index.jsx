const EnvironmentService = function () {
  this.jsdom = navigator.userAgent.includes('jsdom')

  return {
    jsdom: this.jsdom,
  }
}

export { EnvironmentService }
