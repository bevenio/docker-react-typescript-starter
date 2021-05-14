export default class EnvironmentService {
  constructor() {
    this.jsdom = navigator.userAgent.includes('jsdom')
  }

  get isJsdom() {
    return this.jsdom
  }
}
