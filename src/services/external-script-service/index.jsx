const PARENT_NODE_CLASS = 'app-external-scripts'

const getScriptParent = () => {
  if (!document.querySelectorAll(`.${PARENT_NODE_CLASS}`).length > 0) {
    const parentNode = document.createElement('span')
    parentNode.classList.add(PARENT_NODE_CLASS)
    document.body.appendChild(parentNode)
    return parentNode
  }
  return document.querySelector(`.${PARENT_NODE_CLASS}`)
}

const appendScript = (url) => {
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

const removeScript = (node) => {
  if (node instanceof HTMLElement && node.tagName === 'script') {
    const parent = getScriptParent()
    parent.removeChild(node)
  }
  throw new Error('Element is not a valid script node')
}

export { appendScript }
export { removeScript }

export default {
  appendScript,
  removeScript,
}
