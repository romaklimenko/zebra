-- see http://rosettacode.org/wiki/Zebra_puzzle#Haskell
import Control.Monad
import Data.List
 
values :: (Bounded a, Enum a) => [[a]]
values = permutations [minBound..maxBound]

data Nation = Norwegian | Dane | Englishman | German | Swede
  deriving (Bounded, Enum, Eq, Show)

data Color = Yellow | Blue | Red | Green | White
  deriving (Bounded, Enum, Eq, Show)

data Pet = Cat | Horse | Bird | Fish | Dog
  deriving (Bounded, Enum, Eq, Show)

data Drink = Water | Tea | Milk | Coffee | Beer
  deriving (Bounded, Enum, Eq, Show)

data Smoke = Dunhill | Blend | PallMall | Prince | BlueMasters
  deriving (Bounded, Enum, Eq, Show)

same xs x ys y = guard $ (x, y) `elem` zip xs ys

leftOf xs x ys y = same xs x (tail ys) y

nextTo xs x ys y = leftOf xs x ys y `mplus`
                   leftOf ys y xs x

middle xs x = guard $ xs !! 2 == x

first xs x = guard $ head xs == x

answers = do
  color <- values
  leftOf color Green color White      -- 4.  The green house is just to the left of the white one.

  nation <- values
  same nation Englishman color Red    -- 1.  The Englishman lives in the red house.
  first nation Norwegian              -- 9.  The Norwegian lives in the first house.
  nextTo nation Norwegian color Blue  -- 14. The Norwegian lives next to the blue house.

  pet <- values
  same nation Swede pet Dog           -- 2.  The Swede keeps dogs.

  drink <- values
  same nation Dane drink Tea          -- 3.  The Dane drinks tea.
  same drink Coffee color Green       -- 5.  The owner of the green house drinks coffee.
  middle drink Milk                   -- 8.  The man in the center house drinks milk.

  smoke <- values
  same smoke PallMall pet Bird        -- 6.  The Pall Mall smoker keeps birds.
  same color Yellow smoke Dunhill     -- 7.  The owner of the yellow house smokes Dunhills.
  nextTo smoke Blend pet Cat          -- 10. The Blend smoker has a neighbor who keeps cats.
  same smoke BlueMasters drink Beer   -- 11. The man who smokes Blue Masters drinks bier.
  nextTo pet Horse smoke Dunhill      -- 12. The man who keeps horses lives next to the Dunhill smoker.
  same nation German smoke Prince     -- 13. The German smokes Prince.
  nextTo smoke Blend drink Water      -- 15. The Blend smoker has a neighbor who drinks water.

  return $ zip5 nation color pet drink smoke

main = forM_ answers $ (\answer -> mapM_ print answer)