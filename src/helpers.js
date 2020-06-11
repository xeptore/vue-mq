import json2mq from 'json2mq'

export function transformValuesFromBreakpoints(breakpoints, values, currentBreakpoint) {
  const findClosestValue = (currentBreakpoint) => {
    if (values[currentBreakpoint] !== undefined) return values[currentBreakpoint]
    const index = breakpoints.findIndex(b => b === currentBreakpoint)
    const newBreakpoint = index !== -1 || index !== 0 ? breakpoints[index-1] : null
    if (!newBreakpoint) return values[index]
    return values[newBreakpoint] !== undefined ? values[newBreakpoint] : findClosestValue(newBreakpoint)
  }
  return findClosestValue(currentBreakpoint)
}

export function selectBreakpoints(breakpoints, currentBreakpoint) {
  const index = breakpoints.findIndex(b => b === currentBreakpoint)
  return breakpoints.slice(index)
}

export function subscribeToMediaQuery(mediaQuery, enter) {
  const mql = window.matchMedia(mediaQuery)
  const cb = ({ matches }) => {
    if (matches) enter()
  }
  mql.addListener(cb) //subscribing
  cb(mql) //initial trigger
}