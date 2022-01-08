# Mastermind

## Setup
- **Clone/pull repo**
- `npm install`
- `npm start-watch` for the server and database
- `npm run bundle` (in a separate terminal) for webpack/react/index.html
- Navigate to `http://localhost:3000`or `http://localhost:4000` in browser, depending on the port used

## Code Structure 
<img width="200" alt="Screen Shot 2022-01-08 at 12 17 22 AM" src="https://user-images.githubusercontent.com/78227541/148633931-2a27adec-f34e-4b55-931c-024867a2b1fd.png">

[image](<img width="200" alt="Screen Shot 2022-01-08 at 12 17 22 AM" src="https://user-images.githubusercontent.com/78227541/148633945-d2a036fe-12b5-4345-82a7-08f81d0698af.png">)

## Thought Process and Detailed Steps Taken During This Project 
[Engineering Journal - https://gist.github.com/aleksandar-cakic/678f9993f36f8cc2560dc80ded34aa35](https://gist.github.com/aleksandar-cakic/678f9993f36f8cc2560dc80ded34aa35)

## Creative Extensions 
- Implemented 4 types of difficulties that alter available time to play the game, and use either duplicate or unique pegs for the solution
- Implemented a timer for the entire game that upon running out ends the game as a loss
- Changed game logic and UI to use colored shapes instead of numbers 
- Attempted to keep track of score, settled for a 'You WON / You LOST' prompt due to time constraint 
- Added MongoDB as database and stored solutions there

## 
Given more time these would be my updates
- Improve difficulty system by increasing the number of pegs a user has to guess
- Increase number of colors available for a guess
- Deploy on AWS EC2
- Implement user service which stores users on a database and tracks email, password, sessions played, win/loss ratio
- Implement OATH
- Implement testing with Jest
- Scale horizontally with a load balancer and 4 servers accross 4 AWS EC2 t2.micro instances 

## Steps Taken during this project 

I used MERN stack to develop this project. First part was setting up the structure:
- Setting up the Application
- Setting up the Node Server
- Creating the Routes
- Defining the Models
- Deciding on the database
- Connecting to the database
- Testing the API
- Drawing out state flow diagram 
- Writing out user stories 
- Creating the Frontend
- Running the React App
- Creating the React Components
- Updating CSS 
- Updating Game Logic 
- Fixing memory leaks 
- Fixing faulty logic
- Polishing the app
- Refactoring
