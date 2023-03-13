# LetsPlayGolf
A mobile-friendly golf score keeping app

---
## Requirements
 - [ ] (4pt) Create the main scoring table with columns for each
   - [ ] hole,
   - [ ] out score,
   - [ ] in score, and
   - [ ] total score.
 - [ ] (2pt) Use the golf data API to bring in the data for the golf course(s).
 - [ ] (5pt) Create a row that loads
   - [ ] yardage,
   - [ ] handicap, and
   - [ ] par
     - [ ] for each hole
   - [ ] from the course data and displays it in the table.
   - [ ] The row should have a "total" column for the sum of all 18 holes.
 - [ ] (4pt) Create a row to keep track of a player's score.
   - [ ] This row should allow users to enter their
     - [ ] name and a
     - [ ] score
       - [ ] for each hole.
   - [ ]  When a user types in a score for a hole, the
     - [ ]  out,
     - [ ]  in, and
     - [ ]  total columns should update
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
