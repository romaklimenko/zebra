'use strict'

const concat = (array, value) => {
  return (Array.isArray(array) ? array : [array]).concat(value)
}

const flatten = (array) => {
  return array.reduce((previous, current) => previous.concat(current))
}

const cartesian = (sets) => {
  return sets.reduce((accumulated, current) => {
    return flatten(accumulated.map(a => {
      return current.map(c => concat(a, c))
    }) )
  })
}

module.exports = {
  cartesian,
  concat,
  flatten
}
