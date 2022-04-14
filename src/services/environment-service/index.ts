const EnvironmentService = function (): unknown {
  const jsdom = navigator.userAgent.includes('jsdom')

  return {
    jsdom,
  }
}

export { EnvironmentService }
