'use strict'

const number = [1,2,3,4,5]
const color = ['YELLOW','BLUE','RED','GREEN','WHITE']
const nationality = ['NORWEGIAN','DANE','ENGLISHMAN','GERMAN','SWEDE']
const drink = ['WATER','TEA','MILK','COFFEE','BEER']
const smoke = ['DUNHILL','BLEND','PALL MALL','PRINCE','BLUE MASTERS']
const animal = ['CAT','HORSE','BIRD','FISH','DOG']

const concat = (array, value) => {
  return (Array.isArray(array) ? array : [array]).concat(value)
}

const flatten = (array) => {
  return array.reduce((previous, current) => previous.concat(current), [])
}

const filter = (array, filters) => {
  if (!filters || filters.length === 0) {
    return array
  }

  return array
    .map(a => Array.isArray(a) ? a : [a])
    .filter(a => {
      return filters
        .filter(f => a.length === f.require)
        .filter(f => !f.test(a)).length === 0
    })
}

const cartesian = (sets, filters) => {
  return sets.reduce((accumulated, current, index) => {
    console.info('level:', accumulated[0].length, 'set size:', accumulated.length)
    if (index === 0) {
      return current
    }
    return filter(flatten(accumulated.map(a => {
          return current.map(c => {
            return concat(a, c)
          })
        })
      ), filters)
    }, sets[0].map(s => [s])
  )
}

// 1.  The Englishman lives in the red house.
// 2.  The Swede keeps dogs.
// 3.  The Dane drinks tea.
// 4.  The green house is just to the left of the white one.
// 5.  The owner of the green house drinks coffee.
// 6.  The Pall Mall smoker keeps birds.
// 7.  The owner of the yellow house smokes Dunhills.
// 8.  The man in the center house drinks milk.
// 9.  The Norwegian lives in the first house.
// 10. The Blend smoker has a neighbor who keeps cats.
// 11. The man who smokes Blue Masters drinks bier.
// 12. The man who keeps horses lives next to the Dunhill smoker.
// 13. The German smokes Prince.
// 14. The Norwegian lives next to the blue house.
// 15. The Blend smoker has a neighbor who drinks water.

module.exports = {
  cartesian,
  concat,
  flatten,

  number,
  color,
  nationality,
  drink,
  smoke,
  animal
}
