import { useEffect, useRef } from 'react'

// Returns the previous version of the passed value
const usePrevious = function <T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export { usePrevious }
