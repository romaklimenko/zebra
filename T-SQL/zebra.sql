SET NOCOUNT ON

DECLARE @number TABLE (number INT)
INSERT INTO @number (number) SELECT 1
INSERT INTO @number (number) SELECT 2
INSERT INTO @number (number) SELECT 3
INSERT INTO @number (number) SELECT 4
INSERT INTO @number (number) SELECT 5

DECLARE @color TABLE (color NVARCHAR(64))
INSERT INTO @color (color) SELECT 'YELLOW'
INSERT INTO @color (color) SELECT 'BLUE'
INSERT INTO @color (color) SELECT 'RED'
INSERT INTO @color (color) SELECT 'GREEN'
INSERT INTO @color (color) SELECT 'WHITE'

DECLARE @nationality TABLE (nationality NVARCHAR(64))
INSERT INTO @nationality (nationality) SELECT 'NORWEGIAN'
INSERT INTO @nationality (nationality) SELECT 'DANE'
INSERT INTO @nationality (nationality) SELECT 'ENGLISHMAN'
INSERT INTO @nationality (nationality) SELECT 'GERMAN'
INSERT INTO @nationality (nationality) SELECT 'SWEDE'

DECLARE @drink TABLE (drink NVARCHAR(64))
INSERT INTO @drink (drink) SELECT 'WATER'
INSERT INTO @drink (drink) SELECT 'TEA'
INSERT INTO @drink (drink) SELECT 'MILK'
INSERT INTO @drink (drink) SELECT 'COFFEE'
INSERT INTO @drink (drink) SELECT 'BEER'

DECLARE @smoke TABLE (smoke NVARCHAR(64))
INSERT INTO @smoke (smoke) SELECT 'DUNHILL'
INSERT INTO @smoke (smoke) SELECT 'BLEND'
INSERT INTO @smoke (smoke) SELECT 'PALL MALL'
INSERT INTO @smoke (smoke) SELECT 'PRINCE'
INSERT INTO @smoke (smoke) SELECT 'BLUE MASTERS'

DECLARE @animal TABLE (animal NVARCHAR(64))
INSERT INTO @animal (animal) SELECT 'CAT'
INSERT INTO @animal (animal) SELECT 'HORSE'
INSERT INTO @animal (animal) SELECT 'BIRD'
INSERT INTO @animal (animal) SELECT 'FISH'
INSERT INTO @animal (animal) SELECT 'DOG'

-- Cartesian product
SELECT --COUNT(*)
  number1.number as number1, color1.color as color1, nationality1.nationality as nationality1, drink1.drink as drink1, smoke1.smoke as smoke1, animal1.animal as animal1,
  number2.number as number2, color2.color as color2, nationality2.nationality as nationality2, drink2.drink as drink2, smoke2.smoke as smoke2, animal2.animal as animal2,
  number3.number as number3, color3.color as color3, nationality3.nationality as nationality3, drink3.drink as drink3, smoke3.smoke as smoke3, animal3.animal as animal3,
  number4.number as number4, color4.color as color4, nationality4.nationality as nationality4, drink4.drink as drink4, smoke4.smoke as smoke4, animal4.animal as animal4,
  number5.number as number5, color5.color as color5, nationality5.nationality as nationality5, drink5.drink as drink5, smoke5.smoke as smoke5, animal5.animal as animal5
FROM
  @number number1, @color color1, @nationality nationality1, @drink drink1, @smoke smoke1, @animal animal1,
  @number number2, @color color2, @nationality nationality2, @drink drink2, @smoke smoke2, @animal animal2,
  @number number3, @color color3, @nationality nationality3, @drink drink3, @smoke smoke3, @animal animal3,
  @number number4, @color color4, @nationality nationality4, @drink drink4, @smoke smoke4, @animal animal4,
  @number number5, @color color5, @nationality nationality5, @drink drink5, @smoke smoke5, @animal animal5
WHERE
  -- We can avoid this to solve the problem, but adding a number table speeds up the query in many times.
  number1.number = 1 AND
  number2.number = 2 AND
  number3.number = 3 AND
  number4.number = 4 AND
  number5.number = 5 AND
  -- A set of conditions to avoid same each kind of values to be repeated at the same row.
  color1.color <> color2.color AND
  color1.color <> color3.color AND
  color1.color <> color4.color AND
  color1.color <> color5.color AND
  color2.color <> color3.color AND
  color2.color <> color4.color AND
  color2.color <> color5.color AND
  color3.color <> color4.color AND
  color3.color <> color5.color AND
  color4.color <> color5.color
  AND
  nationality1.nationality <> nationality2.nationality AND
  nationality1.nationality <> nationality3.nationality AND
  nationality1.nationality <> nationality4.nationality AND
  nationality1.nationality <> nationality5.nationality AND
  nationality2.nationality <> nationality3.nationality AND
  nationality2.nationality <> nationality4.nationality AND
  nationality2.nationality <> nationality5.nationality AND
  nationality3.nationality <> nationality4.nationality AND
  nationality3.nationality <> nationality5.nationality AND
  nationality4.nationality <> nationality5.nationality
  AND
  drink1.drink <> drink2.drink AND
  drink1.drink <> drink3.drink AND
  drink1.drink <> drink4.drink AND
  drink1.drink <> drink5.drink AND
  drink2.drink <> drink3.drink AND
  drink2.drink <> drink4.drink AND
  drink2.drink <> drink5.drink AND
  drink3.drink <> drink4.drink AND
  drink3.drink <> drink5.drink AND
  drink4.drink <> drink5.drink
  AND
  smoke1.smoke <> smoke2.smoke AND
  smoke1.smoke <> smoke3.smoke AND
  smoke1.smoke <> smoke4.smoke AND
  smoke1.smoke <> smoke5.smoke AND
  smoke2.smoke <> smoke3.smoke AND
  smoke2.smoke <> smoke4.smoke AND
  smoke2.smoke <> smoke5.smoke AND
  smoke3.smoke <> smoke4.smoke AND
  smoke3.smoke <> smoke5.smoke AND
  smoke4.smoke <> smoke5.smoke
  AND
  animal1.animal <> animal2.animal AND
  animal1.animal <> animal3.animal AND
  animal1.animal <> animal4.animal AND
  animal1.animal <> animal5.animal AND
  animal2.animal <> animal3.animal AND
  animal2.animal <> animal4.animal AND
  animal2.animal <> animal5.animal AND
  animal3.animal <> animal4.animal AND
  animal3.animal <> animal5.animal AND
  animal4.animal <> animal5.animal
  AND
  -- The Englishman lives in the red house.
 (color1.color = 'RED' AND nationality1.nationality = 'ENGLISHMAN' OR
  color2.color = 'RED' AND nationality2.nationality = 'ENGLISHMAN' OR
  color3.color = 'RED' AND nationality3.nationality = 'ENGLISHMAN' OR
  color4.color = 'RED' AND nationality4.nationality = 'ENGLISHMAN' OR
  color5.color = 'RED' AND nationality5.nationality = 'ENGLISHMAN')
  AND
  -- The Swede keeps dogs.
 (nationality1.nationality = 'SWEDE' AND animal1.animal = 'DOG' OR
  nationality2.nationality = 'SWEDE' AND animal2.animal = 'DOG' OR
  nationality3.nationality = 'SWEDE' AND animal3.animal = 'DOG' OR
  nationality4.nationality = 'SWEDE' AND animal4.animal = 'DOG' OR
  nationality5.nationality = 'SWEDE' AND animal5.animal = 'DOG')
  AND
  -- The Dane drinks tea.
 (nationality1.nationality = 'DANE' AND drink1.drink = 'TEA' OR
  nationality2.nationality = 'DANE' AND drink2.drink = 'TEA' OR
  nationality3.nationality = 'DANE' AND drink3.drink = 'TEA' OR
  nationality4.nationality = 'DANE' AND drink4.drink = 'TEA' OR
  nationality5.nationality = 'DANE' AND drink5.drink = 'TEA')
  AND
  -- The green house is just to the left of the white one.
 (color1.color = 'GREEN' AND color2.color = 'WHITE' OR
  color2.color = 'GREEN' AND color3.color = 'WHITE' OR
  color3.color = 'GREEN' AND color4.color = 'WHITE' OR
  color4.color = 'GREEN' AND color5.color = 'WHITE')
  AND
  -- The owner of the green house drinks coffee.
 (color1.color = 'GREEN' AND drink1.drink = 'COFFEE' OR
  color2.color = 'GREEN' AND drink2.drink = 'COFFEE' OR
  color3.color = 'GREEN' AND drink3.drink = 'COFFEE' OR
  color4.color = 'GREEN' AND drink4.drink = 'COFFEE' OR
  color5.color = 'GREEN' AND drink5.drink = 'COFFEE')
  AND
  -- The Pall Mall smoker keeps birds.
 (smoke1.smoke = 'PALL MALL' AND animal1.animal = 'BIRD' OR
  smoke2.smoke = 'PALL MALL' AND animal2.animal = 'BIRD' OR
  smoke3.smoke = 'PALL MALL' AND animal3.animal = 'BIRD' OR
  smoke4.smoke = 'PALL MALL' AND animal4.animal = 'BIRD' OR
  smoke5.smoke = 'PALL MALL' AND animal5.animal = 'BIRD')
  AND
  -- The owner of the yellow house smokes Dunhills.
 (color1.color = 'YELLOW' AND smoke1.smoke = 'DUNHILL' OR
  color2.color = 'YELLOW' AND smoke2.smoke = 'DUNHILL' OR
  color3.color = 'YELLOW' AND smoke3.smoke = 'DUNHILL' OR
  color4.color = 'YELLOW' AND smoke4.smoke = 'DUNHILL' OR
  color5.color = 'YELLOW' AND smoke5.smoke = 'DUNHILL')
  AND
 -- The man in the center house drinks milk.
 (drink3.drink = 'MILK')
 AND
 -- The Norwegian lives in the first house.
  nationality1.nationality = 'NORWEGIAN'
  AND
  -- The Blend smoker has a neighbor who keeps cats.
 (smoke1.smoke = 'BLEND' AND animal2.animal = 'CAT' OR
  smoke2.smoke = 'BLEND' AND animal1.animal = 'CAT' OR
  smoke2.smoke = 'BLEND' AND animal3.animal = 'CAT' OR
  smoke3.smoke = 'BLEND' AND animal2.animal = 'CAT' OR
  smoke3.smoke = 'BLEND' AND animal4.animal = 'CAT' OR
  smoke4.smoke = 'BLEND' AND animal3.animal = 'CAT' OR
  smoke4.smoke = 'BLEND' AND animal5.animal = 'CAT' OR
  smoke5.smoke = 'BLEND' AND animal4.animal = 'CAT')
  AND
  -- The man who smokes Blue Masters drinks bier.
 (smoke1.smoke = 'BLUE MASTERS' AND drink1.drink = 'BEER' OR
  smoke2.smoke = 'BLUE MASTERS' AND drink2.drink = 'BEER' OR
  smoke3.smoke = 'BLUE MASTERS' AND drink3.drink = 'BEER' OR
  smoke4.smoke = 'BLUE MASTERS' AND drink4.drink = 'BEER' OR
  smoke5.smoke = 'BLUE MASTERS' AND drink5.drink = 'BEER')
  AND
  -- The man who keeps horses lives next to the Dunhill smoker.
 (animal1.animal = 'HORSE' AND smoke2.smoke = 'DUNHILL' OR
  animal2.animal = 'HORSE' AND smoke1.smoke = 'DUNHILL' OR
  animal2.animal = 'HORSE' AND smoke3.smoke = 'DUNHILL' OR
  animal3.animal = 'HORSE' AND smoke2.smoke = 'DUNHILL' OR
  animal3.animal = 'HORSE' AND smoke4.smoke = 'DUNHILL' OR
  animal4.animal = 'HORSE' AND smoke3.smoke = 'DUNHILL' OR
  animal5.animal = 'HORSE' AND smoke4.smoke = 'DUNHILL')
  AND
  -- The German smokes Prince.
 (nationality1.nationality = 'GERMAN' AND smoke1.smoke = 'PRINCE' OR
  nationality2.nationality = 'GERMAN' AND smoke2.smoke = 'PRINCE' OR
  nationality3.nationality = 'GERMAN' AND smoke3.smoke = 'PRINCE' OR
  nationality4.nationality = 'GERMAN' AND smoke4.smoke = 'PRINCE' OR
  nationality5.nationality = 'GERMAN' AND smoke5.smoke = 'PRINCE')
  AND
  -- The Norwegian lives next to the blue house.
 (nationality1.nationality = 'NORWEGIAN' AND color2.color = 'BLUE' OR
  nationality2.nationality = 'NORWEGIAN' AND color1.color = 'BLUE' OR
  nationality2.nationality = 'NORWEGIAN' AND color3.color = 'BLUE' OR
  nationality3.nationality = 'NORWEGIAN' AND color2.color = 'BLUE' OR
  nationality3.nationality = 'NORWEGIAN' AND color4.color = 'BLUE' OR
  nationality4.nationality = 'NORWEGIAN' AND color3.color = 'BLUE' OR
  nationality4.nationality = 'NORWEGIAN' AND color5.color = 'BLUE' OR
  nationality5.nationality = 'NORWEGIAN' AND color4.color = 'BLUE')
  AND
  -- The Blend smoker has a neighbor who drinks water.
 (smoke1.smoke = 'BLEND' AND drink2.drink = 'WATER' OR
  smoke2.smoke = 'BLEND' AND drink1.drink = 'WATER' OR
  smoke2.smoke = 'BLEND' AND drink3.drink = 'WATER' OR
  smoke3.smoke = 'BLEND' AND drink2.drink = 'WATER' OR
  smoke3.smoke = 'BLEND' AND drink4.drink = 'WATER' OR
  smoke4.smoke = 'BLEND' AND drink3.drink = 'WATER' OR
  smoke4.smoke = 'BLEND' AND drink5.drink = 'WATER' OR
  smoke5.smoke = 'BLEND' AND drink4.drink = 'WATER')
