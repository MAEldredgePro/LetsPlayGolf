# Let's Play Golf! Developer Notes

## Dev Plan
 - Develop against phone screen dimensions - use Chrome dev tools to display
my app/web page on a phone-like screen.
 - Develop for landscape orientation first
 - Create the following pages:
   - [ ] Welcome/splash
   - [ ] Course selection
     - [ ] dropdown populated with three predefined courses
   - [ ] Scorecard
     - [ ] 18 holes, in and out
     - [ ] up to four players
       - [ ] only render lines for number of active players
     - [ ] auto computed running total score
     - [ ] (opt) red/green for over/under par?
   - [ ] End game? Celebrate?
   - [ ] (opt) view previous games

 ## Tasks
 - [x] Download a golf scorecard to use as a model/mock
 - [ ] Figure out the main flow of the program.
   - [x] Walk through from user's POV
   - [ ] Walk through from software flow POV

---

## User Experience
User opens the app
 - welcome/splash screen?
   - Only if there is not a game in progress
   - User should not have to dismiss, it should go away on its own
   - User should be able to dismiss before it times out
 - If there is a saved game (max 1)
   - Load up the saved game and display the score card
 - If there is not a saved game
   - Present course selection screen and wait.

 - When user selects a course
   - download course details (spin cursor?)
   - generate scorecard
   - somehow signal the user to add players
     - maybe display a single player line with 'Player 1'
       - need keyboard input - maybe don't need to test on actual phone?
     - Once player inputs a name. click done button? 'Start Game' button?

 - Play mode:
   - Players can enter scores in any player order, but constrain to current hole
   - constrain to positive integers
   - color for over/under par
   - celebrate?
 - Stopping game in the middle?
 - End game behavior?

---

## General Page Software Flow
 - Create object representing page date
   - load from persistent storage (and/or external data source)
   - render page
   - wait for user interaction
 - On User Interaction
   - update page object
   - save object to persistent storage
   - render page
   - wait for user interaction


https://maeldredgepro.github.io/LetsPlayGolf/courses/course11819.txt
https://maeldredgepro.github.io/LetsPlayGolf/courses/course18300.txt
https://maeldredgepro.github.io/LetsPlayGolf/courses/course19002.txt
