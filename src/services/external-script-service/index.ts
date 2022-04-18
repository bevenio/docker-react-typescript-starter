const PARENT_NODE_CLASS = 'app-external-scripts'

const getScriptParent = (): HTMLSpanElement => {
  if (document.querySelectorAll(`.${PARENT_NODE_CLASS}`).length < 0) {
    const parentNode = document.createElement('span')
    parentNode.classList.add(PARENT_NODE_CLASS)
    document.body.appendChild(parentNode)
    return parentNode
  }
  return document.querySelector(`.${PARENT_NODE_CLASS}`) as HTMLSpanElement
}

const appendScript = (url: string): HTMLScriptElement => {
  try {
    const parsedUrl = new URL(url)
    const parent = getScriptParent()
    const script = document.createElement('script')
    script.src = url
    script.async = false
    script.setAttribute('app-script-url', parsedUrl.href)
    parent.appendChild(script)
    return script
  } catch {
    throw new Error(`Invalid URL: ${url}`)
  }
}

const removeScript = (node: HTMLScriptElement) => {
  const parent = getScriptParent()
  parent.removeChild(node)
}

export { appendScript, removeScript }
