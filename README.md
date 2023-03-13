# LetsPlayGolf
A mobile-friendly golf score keeping app

---
## Requirements
 - [ ] (2pt) Use the golf data API to bring in the data for the golf course(s).
 - [ ] (4pt) Create the main scoring table with the following columns:
   - [ ] col for row name (Hole, Yardage, Par, Handicap, PlayerName)
   - [ ] cols for holes 1-9
   - [ ] col for 'out' totals
   - [ ] cols for holes 10-18
   - [ ] col for 'in' totals
   - [ ] col for course totals
 - [ ] (5pt) Create the following rows and populate from course data:
   - [ ] hole number
   - [ ] hole yardage
   - [ ] hole par
   - [ ] hole handicap
 - [ ] (4pt) Create a row for each player to to keep track of their per-hole and
cumulative scores.
   - [ ] This row should allow users to enter their name and a per-hole score.
   - [ ] When a user enters a score for a hole, the 'out', 'in', and course
total columns should update automatically.
 - [ ] (3pt) Add some CSS to style the card to look like an actual golf card.
 - [ ] (5pt) Allow users to select which tee they will be using
(Men's, Women's, Pro, Amateur, etc.). All players will play from the same tee.
 - [ ] (2pt) Allow up to four players in your scorecard.
 - [ ] (5pt) Minimum of 5+ commits
 - [ ] (Bonus 3pt) Your golf scorecard is responsive (mobile friendly).
 - [ ] (Bonus 3pt) Allow the golfer to select any golf course that is available
from the api. The scorecard will show the new golf course information
(par, yardage, etc.)
 - [ ] (Bonus 2pt) include ES6 Modules. Indicate with a comment which js files
and lines you specifically applied ES6 Modules
---
## Development Plan
### I - Course Selection
 - [ ] download course data
   - [ ] can't download list of courses so we'll have to be satisfied with the
static set of courses outlined in the assignment description
     - Course ID 11819
       - Thanksgiving Point Golf Course
       - http://uxcobra.com/golfapi/course11819.txt
     - Course ID: 18300
       - Fox Hollow Golf Course
       - http://uxcobra.com/golfapi/course18300.txt
     - Course ID: 19002
       - Spanish Oaks Golf Course
       - http://uxcobra.com/golfapi/course19002.txt
 - [x] populate course picker dropdown
 - [x] Fore! button opens the scorecard page
   - [ ] pass course ID to scorecard page on open
### II - Player Selection
 - [ ] Input from 1 to 4 players
### III - Tee Selection
### IV - Scorekeeping
 - [ ] Choose to play front, back, or both in either order?
 - [ ] Iterate holes
   - [ ] Iterate players
   - [ ] Keep running totals
