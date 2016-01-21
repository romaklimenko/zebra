'use strict'

const test = require('tape')
const Zebra = require('./zebra')

test('cartesian product of two sets', (assert) => {
  const letters = ['a', 'b', 'c']
  const numbers = [1, 2, 3]
  const cartesian = Zebra.cartesian([letters, numbers])
  assert.equal(cartesian.length, letters.length * numbers.length)
  assert.deepEqual(
    [
      ['a', 1], ['a', 2], ['a', 3],
      ['b', 1], ['b', 2], ['b', 3],
      ['c', 1], ['c', 2], ['c', 3]
    ],
    cartesian)
  assert.end()
})

test('concat array and value', (assert) => {
  const actual = Zebra.concat([1], 2)
  assert.deepEqual(actual, [1, 2])
  assert.end()
})

test('concat value and value', (assert) => {
  const actual = Zebra.concat(1, 2)
  assert.deepEqual(actual, [1, 2])
  assert.end()
})

test('cartesian product of three sets', (assert) => {
  const letters = ['a', 'b', 'c']
  const numbers = [1, 2, 3]
  const symbols = ['!', '!!', '!!!']
  const cartesian = Zebra.cartesian([letters, numbers, symbols])
  assert.equal(
    cartesian.length, letters.length * numbers.length * symbols.length)
  assert.deepEqual(
    cartesian,
    [
      [ 'a', 1, '!' ], [ 'a', 1, '!!' ], [ 'a', 1, '!!!' ],
      [ 'a', 2, '!' ], [ 'a', 2, '!!' ], [ 'a', 2, '!!!' ],
      [ 'a', 3, '!' ], [ 'a', 3, '!!' ], [ 'a', 3, '!!!' ],

      [ 'b', 1, '!' ], [ 'b', 1, '!!' ], [ 'b', 1, '!!!' ],
      [ 'b', 2, '!' ], [ 'b', 2, '!!' ], [ 'b', 2, '!!!' ],
      [ 'b', 3, '!' ], [ 'b', 3, '!!' ], [ 'b', 3, '!!!' ],

      [ 'c', 1, '!' ], [ 'c', 1, '!!' ], [ 'c', 1, '!!!' ],
      [ 'c', 2, '!' ], [ 'c', 2, '!!' ], [ 'c', 2, '!!!' ],
      [ 'c', 3, '!' ], [ 'c', 3, '!!' ], [ 'c', 3, '!!!' ]
    ])

  assert.end()
  })

test('flatten', (assert) => {
  const array = [[0, 1], [2, 3], [4, 5]]
  const flattened = Zebra.flatten(array)
  assert.deepEqual([0, 1, 2, 3, 4, 5], flattened)
  assert.end()
})
