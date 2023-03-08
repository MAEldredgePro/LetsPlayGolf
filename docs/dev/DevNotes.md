# Let's Play Golf! Developer Notes

## Dev Plan
 - [ ] Develop against phone screen dimensions - use Chrome dev tools to display
my app/web page on a phone-like screen.
 - [ ] Develop for landscape orientation first
 - [ ] Create Course Selection Screen

 ## Tasks
 - [x] Download a golf scorecard to use as a model/mock
 - [ ] Figure out the main flow of the program.  Walk through from user's POV

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
