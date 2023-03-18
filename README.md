# LetsPlayGolf
A mobile-friendly golf score keeping app

---
## Actively Developing Requirement(s)
 - [ ] (3pt) Add some CSS to style the card to look like an actual golf card.
   - [x] Add background images to courses screen
     - [x] Custom image for each golf course
   - [x] Make it easier to read hole numbers by providing a semi-transparent table background color
   - [ ] Add tee-type colors provided in the the course info json

---
## Requirements
 - [ ] (2pt) Use the golf data API to bring in the data for the golf course(s).
   - [ ] Unable to get golf data API working as of yet.
   - [x] Using 'fetch' to download my own copy of the data from GitHub Pages
 - [x] (4pt) Create the main scoring table with the following columns:
   - [x] col for row name (Hole, Yardage, Par, Handicap, PlayerName)
   - [x] cols for holes 1-9
   - [x] col for 'out' totals
   - [x] cols for holes 10-18
   - [x] col for 'in' totals
   - [x] col for course totals
 - [x] (5pt) Create the following rows and populate from course data:
   - [x] hole number
   - [x] hole yardage
   - [x] hole par
   - [x] hole handicap
 - [x] (4pt) Create a row for each player to to keep track of their per-hole and
cumulative scores.
   - [x] This row should allow users to enter their name and a per-hole score.
   - [x] When a user enters a score for a hole, the 'out', 'in', and course
total columns should update automatically.
 - [ ] (3pt) Add some CSS to style the card to look like an actual golf card.
 - [x] (5pt) Allow users to select which tee they will be using
(Men's, Women's, Pro, Amateur, etc.). All players will play from the same tee.
 - [x] (2pt) Allow up to four players in your scorecard.
 - [x] (5pt) Minimum of 5+ commits
 - [ ] (Bonus 3pt) Your golf scorecard is responsive (mobile friendly).
 - [x] (Bonus 3pt) Allow the golfer to select any golf course that is available
from the api.
   - [x] The scorecard will show the new golf course information (par, yardage, etc.)
 - [ ] (Bonus 2pt) include ES6 Modules. Indicate with a comment which js files
and lines you specifically applied ES6 Modules
