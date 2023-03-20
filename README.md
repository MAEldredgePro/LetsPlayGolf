# LetsPlayGolf
A mobile-friendly golf score keeping app

---
## Actively Developing Requirement(s)
1. - [ ] (BONUS 2pt) include ES6 Modules. Indicate with a comment which js files
and lines you specifically applied ES6 Modules
     - [ ] a. put ElementFactory in its own module

---
## Requirements
1. - [x] (4pt) Create the main scoring table with the following columns:
     - [x] a) col for row name (Hole, Yardage, Par, Handicap, PlayerName)
     - [x] b) cols for holes 1-9
     - [x] c) col for 'out' totals
     - [x] d) cols for holes 10-18
     - [x] e) col for 'in' totals
     - [x] f) col for course totals
1. - [ ] (2pt) Use the golf data API to bring in the data for the golf
course(s).
     - [ ] a) Unable to get golf data API working as of yet.
     - [x] b) Using 'fetch' to download my own copy of the data from GitHub Pages
1. - [x] (5pt) Create the following rows and populate from course data:
     - [x] a) hole number
     - [x] b) hole yardage
     - [x] c) hole par
     - [x] d) hole handicap
1. - [x] (4pt) Create a row for each player to to keep track of their per-hole and
cumulative scores.
     - [x] a) This row should allow users to enter their name and a per-hole score.
     - [x] b) When a user enters a score for a hole, the 'out', 'in', and course
  total columns should update automatically.
1. - [x] (3pt) Add some CSS to style the card to look like an actual golf card.
     - [x] a) Add background images to courses screen
     - [x] b) Custom image for each golf course
     - [x] c) Make it easier to read hole numbers by providing a semi-transparent table background color
     - [x] d) Add tee-type colors provided in the the course info json
1. - [x] (5pt) Allow users to select which tee they will be using
(Men's, Women's, Pro, Amateur, etc.). All players will play from the same tee.
1. - [x] (2pt) Allow up to four players in your scorecard.
1. - [x] (5pt) Minimum of 5+ commits
1. - [x] (BONUS 3pt) Your golf scorecard is responsive (mobile friendly).
1. - [x] (BONUS 3pt) Allow the golfer to select any golf course that is available
from the api.
     - [x] a. The scorecard will show the new golf course information (par, yardage, etc.)
1. - [ ] (BONUS 2pt) include ES6 Modules. Indicate with a comment which js files
and lines you specifically applied ES6 Modules
