import { useEffect, useRef } from 'react'

// Returns the previous version of the passed value
const usePrevious = function (value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export { usePrevious }
