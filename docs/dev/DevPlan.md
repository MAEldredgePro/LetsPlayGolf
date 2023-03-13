## Development Plan
### I - Course Selection
 - [ ] download course data
   - [ ] can't download list of courses so we'll have to be satisfied with the
static set of courses outlined in the assignment description [Thanksgiving Point](http://uxcobra.com/golfapi/course11819.txt "Course ID 11819"), [Fox Hollow](http://uxcobra.com/golfapi/course18300.txt "Course ID 18300"), and [Spanish Oaks](http://uxcobra.com/golfapi/course19002.txt "Course ID 19002").
 - [ ] add course data JSON to GitHub repo so we can use 'fetch' API
 - [ ] create course list JSON and add to GitHub repo for use with course selection page
 - [ ] populate course picker dropdown
 - [ ] Next button saves app state with chosen course
 - [ ] Next button opens the player selection page
   - [ ] pass course ID to scorecard page on open
### II - Player Selection
 - [ ] Input from 1 to 4 players
### III - Tee Selection
### IV - Scorecard
 - [ ] Choose to play front, back, or both in either order?
 - [ ] Iterate holes
   - [ ] Iterate players
   - [ ] Keep running totals
