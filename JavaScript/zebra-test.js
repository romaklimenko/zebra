'use strict'

const test = require('tape')
const Zebra = require('./zebra')

const color = require('./zebra').color
const nationality = require('./zebra').nationality
const drink = require('./zebra').drink
const smoke = require('./zebra').smoke
const animal = require('./zebra').animal

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

test('filtered cartesian product', (assert) => {
  const letters = ['a', 'b', 'c']
  const numbers = [1, 2, 3]

  const letter_is_a = {
    require: 2,
    test: value => {
      return value[0] === 'a' && value[1] === 2
    }
  }

  const filters = [letter_is_a]

  const actual = Zebra.cartesian([letters, numbers], filters)
  const expected = [[ 'a', 2 ]]
  assert.deepEqual(actual, expected)
  assert.end()
})

test('concat array and value', (assert) => {
  const actual = Zebra.concat([1], 2)
  const expected = [1, 2]
  assert.deepEqual(actual, expected)
  assert.end()
})

test('concat value and value', (assert) => {
  const actual = Zebra.concat(1, 2)
  const expected = [1, 2]
  assert.deepEqual(actual, expected)
  assert.end()
})

test('cartesian product of three sets', (assert) => {
  const letters = ['a', 'b', 'c']
  const numbers = [1, 2, 3]
  const symbols = ['!', '!!', '!!!']
  const actual = Zebra.cartesian([letters, numbers, symbols])
  const expected_len = letters.length * numbers.length * symbols.length
  assert.equal(actual.length, expected_len)
  const expected =
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
    ]

  assert.deepEqual(actual, expected)
  assert.end()
})

test('flatten', (assert) => {
  const array = [[0, 1], [2, 3], [4, 5]]
  const actual = Zebra.flatten(array)
  const expected =  [0, 1, 2, 3, 4, 5]
  assert.deepEqual(actual, expected)
  assert.end()
})

test('the answer', (assert) => {
  const sets = [
    color, color, color, color, color, // 5
    nationality, nationality, nationality, nationality, nationality, // 10
    drink, drink, drink, drink, drink, // 15
    smoke, smoke, smoke, smoke, smoke, // 20
    animal, animal, animal, animal, animal // 25
  ]

  const isUniue = (value, indexes) => {
    const values = []
    indexes.map(i => values.push(value[i]))
    const uniques = values
      .sort()
      .filter((v, i, o) => {
        if (i >= 0 && v !== o[i-1]) {
          return true
        }
      })
    return uniques.length === values.length
  }

  const filters = [
    // colors do not repeat
    {
      require: 5,
      test: (value) => isUniue(value, [0, 1, 2, 3, 4])
    },
    // nationalities do not repeat
    {
      require: 10,
      test: (value) => isUniue(value, [5, 6, 7, 8, 9])
    },
    // drinks do not repeat
    {
      require: 15,
      test: (value) => isUniue(value, [10, 11, 12, 13, 14])
    },
    // smokes do not repeat
    {
      require: 20,
      test: (value) => isUniue(value, [15, 16, 17, 18, 19])
    },
    // animals do not repeat
    {
      require: 25,
      test: (value) => isUniue(value, [20, 21, 22, 23, 24])
    },
    // 1.  The Englishman lives in the red house.
    {
      require: 10,
      test: (value) => {
        const result =  value[5] === 'ENGLISHMAN' && value[0] === 'RED' ||
                        value[6] === 'ENGLISHMAN' && value[1] === 'RED' ||
                        value[7] === 'ENGLISHMAN' && value[2] === 'RED' ||
                        value[8] === 'ENGLISHMAN' && value[3] === 'RED' ||
                        value[9] === 'ENGLISHMAN' && value[4] === 'RED'
        return result
      }
    },
    // 2.  The Swede keeps dogs.
    {
      require: 25,
      test: (value) => {
        const result =  value[5] === 'SWEDE' && value[20] === 'DOG' ||
                        value[6] === 'SWEDE' && value[21] === 'DOG' ||
                        value[7] === 'SWEDE' && value[22] === 'DOG' ||
                        value[8] === 'SWEDE' && value[23] === 'DOG' ||
                        value[9] === 'SWEDE' && value[24] === 'DOG'
        return result
      }
    },
    // 3.  The Dane drinks tea.
    {
      require: 15,
      test: (value) => {
        const result =  value[5] === 'DANE' && value[10] === 'TEA' ||
                        value[6] === 'DANE' && value[11] === 'TEA' ||
                        value[7] === 'DANE' && value[12] === 'TEA' ||
                        value[8] === 'DANE' && value[13] === 'TEA' ||
                        value[9] === 'DANE' && value[14] === 'TEA'
        return result
      }
    },
    // 4.  The green house is just to the left of the white one.
    {
      require: 5,
      test: (value) => {
        const result =  value[0] === 'GREEN' && value[1] === 'WHITE' ||
                        value[1] === 'GREEN' && value[2] === 'WHITE' ||
                        value[2] === 'GREEN' && value[3] === 'WHITE' ||
                        value[3] === 'GREEN' && value[4] === 'WHITE'
        return result
      }
    },
    // 5.  The owner of the green house drinks coffee.
    {
      require: 15,
      test: (value) => {
        const result =  value[0] === 'GREEN' && value[10] === 'COFFEE' ||
                        value[1] === 'GREEN' && value[11] === 'COFFEE' ||
                        value[2] === 'GREEN' && value[12] === 'COFFEE' ||
                        value[3] === 'GREEN' && value[13] === 'COFFEE' ||
                        value[4] === 'GREEN' && value[14] === 'COFFEE'
        return result
      }
    },
    // 6.  The Pall Mall smoker keeps birds.
    {
      require: 25,
      test: (value) => {
        const result =  value[15] === 'PALL MALL' && value[20] === 'BIRD' ||
                        value[16] === 'PALL MALL' && value[21] === 'BIRD' ||
                        value[17] === 'PALL MALL' && value[22] === 'BIRD' ||
                        value[18] === 'PALL MALL' && value[23] === 'BIRD' ||
                        value[19] === 'PALL MALL' && value[24] === 'BIRD'
        return result
      }
    },
    // 7.  The owner of the yellow house smokes Dunhills.
    {
      require: 20,
      test: (value) => {
        const result =  value[0] === 'YELLOW' && value[15] === 'DUNHILL' ||
                        value[1] === 'YELLOW' && value[16] === 'DUNHILL' ||
                        value[2] === 'YELLOW' && value[17] === 'DUNHILL' ||
                        value[3] === 'YELLOW' && value[18] === 'DUNHILL' ||
                        value[4] === 'YELLOW' && value[19] === 'DUNHILL'
        return result
      }
    },
    // 8.  The man in the center house drinks milk.
    {
      require: 13,
      test: (value) => {
        const result =  value[12] === 'MILK'
        return result
      }
    },
    // 9.  The Norwegian lives in the first house.
    {
      require: 6,
      test: (value) => {
        const result =  value[5] === 'NORWEGIAN'
        return result
      }
    },
    // 10. The Blend smoker has a neighbor who keeps cats.
    {
      require: 25,
      test: (value) => {
        const result =  value[15] === 'BLEND' && value[21] === 'CAT' ||

                        value[16] === 'BLEND' && value[20] === 'CAT' ||
                        value[16] === 'BLEND' && value[22] === 'CAT' ||

                        value[17] === 'BLEND' && value[21] === 'CAT' ||
                        value[17] === 'BLEND' && value[23] === 'CAT' ||

                        value[18] === 'BLEND' && value[22] === 'CAT' ||
                        value[18] === 'BLEND' && value[24] === 'CAT' ||

                        value[19] === 'BLEND' && value[23] === 'CAT'
        return result
      }
    },
    // 11. The man who smokes Blue Masters drinks bier.
    {
      require: 20,
      test: (value) => {
        const result =  value[15] === 'BLUE MASTERS' && value[10] === 'BEER' ||
                        value[16] === 'BLUE MASTERS' && value[11] === 'BEER' ||
                        value[17] === 'BLUE MASTERS' && value[12] === 'BEER' ||
                        value[18] === 'BLUE MASTERS' && value[13] === 'BEER' ||
                        value[19] === 'BLUE MASTERS' && value[14] === 'BEER'
        return result
      }
    },
    // 12. The man who keeps horses lives next to the Dunhill smoker.
    {
      require: 25,
      test: (value) => {
        const result =  value[15] === 'DUNHILL' && value[21] === 'HORSE' ||

                        value[16] === 'DUNHILL' && value[20] === 'HORSE' ||
                        value[16] === 'DUNHILL' && value[22] === 'HORSE' ||

                        value[17] === 'DUNHILL' && value[21] === 'HORSE' ||
                        value[17] === 'DUNHILL' && value[23] === 'HORSE' ||

                        value[18] === 'DUNHILL' && value[22] === 'HORSE' ||
                        value[18] === 'DUNHILL' && value[24] === 'HORSE' ||

                        value[19] === 'DUNHILL' && value[23] === 'HORSE'
        return result
      }
    },
    // 13. The German smokes Prince.
    {
      require: 20,
      test: (value) => {
        const result =  value[5] === 'GERMAN' && value[15] === 'PRINCE' ||
                        value[6] === 'GERMAN' && value[16] === 'PRINCE' ||
                        value[7] === 'GERMAN' && value[17] === 'PRINCE' ||
                        value[8] === 'GERMAN' && value[18] === 'PRINCE' ||
                        value[9] === 'GERMAN' && value[19] === 'PRINCE'
        return result
      }
    },
    // 14. The Norwegian lives next to the blue house.
    {
      require: 2,
      test: (value) => {
        const result =  value[1] === 'BLUE'
        return result
      }
    },
    // 15. The Blend smoker has a neighbor who drinks water.
    {
      require: 20,
      test: (value) => {
        const result =  value[15] === 'BLEND' && value[11] === 'WATER' ||

                        value[16] === 'BLEND' && value[10] === 'WATER' ||
                        value[16] === 'BLEND' && value[12] === 'WATER' ||

                        value[17] === 'BLEND' && value[11] === 'WATER' ||
                        value[17] === 'BLEND' && value[13] === 'WATER' ||

                        value[18] === 'BLEND' && value[12] === 'WATER' ||
                        value[18] === 'BLEND' && value[14] === 'WATER' ||

                        value[19] === 'BLEND' && value[13] === 'WATER'
        return result
      }
    }
  ]
  console.time('time spent to find the answer (ms):')
  const answer = Zebra.cartesian(sets, filters)
  console.timeEnd('time spent to find the answer (ms):')
  console.info('answer:', answer)
  assert.end()
})
