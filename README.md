# Mastermind

## Setup
- **Clone/pull repo**
- `npm install`
- `npm start-watch` for the server and database
- `npm run bundle` (in a separate terminal) for webpack/react/index.html
- Navigate to `http://localhost:3000`or `http://localhost:4000` in browser, depending on the port used
- App was tested on Google Chrome

## Thought Process and Detailed Steps Taken During This Project 
[Engineering Journal - https://gist.github.com/aleksandar-cakic/678f9993f36f8cc2560dc80ded34aa35](https://gist.github.com/aleksandar-cakic/678f9993f36f8cc2560dc80ded34aa35)

## Creative Extensions 
- Implemented 4 types of difficulties that alter available time to play the game, and use either duplicate or unique pegs for the solution
- Implemented a timer for the entire game that upon running out ends the game as a loss
- Changed game logic and UI to use colored shapes instead of numbers 
- Attempted to keep track of score, settled for a 'You WON / You LOST' prompt due to time constraint 
- Added MongoDB as database and stored solutions there

## Code Structure 
<img width="200" alt="Screen Shot 2022-01-08 at 12 17 22 AM" src="https://user-images.githubusercontent.com/78227541/148633945-d2a036fe-12b5-4345-82a7-08f81d0698af.png">

- Client folder holds the distributables from bundling with Webpack, and a src folder which stores React components, stylesheets and index.html
- Models folder contains Mongoose Schemas: Game.js - for storing the solution, User.js for storing user information and score status (attempted to implement)
- Routes folder contains user and Random API routes. Currently, only the two Random API routes have been implemented. `/randomNum` gives a random 4 digit integer with duplicate numbers, whilte `/randomUniqueNum` uses the Sequence API call to generate a random integer sequence without duplicate digits. 
- .babelrc and webpack.config.js are used for bundling and converting
- index.js holds the express server, mongoose connection and api routes connection
