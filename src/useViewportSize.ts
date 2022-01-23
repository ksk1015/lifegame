import { useState, useEffect } from 'preact/hooks'

const getViewportSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export const useViewportSize = (debounce = 250) => {
  const [viewportSize, setViewportSize] = useState(getViewportSize())
  useEffect(() => {
    let timeoutId = 0
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(() => {
        timeoutId = 0
        setViewportSize(getViewportSize())
      }, debounce)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return viewportSize
}
