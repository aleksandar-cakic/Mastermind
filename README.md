# Mastermind

## Setup
- **Clone/pull repo**
- `npm install`
- `npm start-watch` for the server and database
- `npm run bundle` (in a separate terminal) for webpack/react/index.html
- Navigate to `http://localhost:3000`or `http://localhost:4000` in browser, depending on the port used
- App was tested on Google Chrome

## Thought Process and Detailed Steps Taken During This Project (also after Code Structure in this README.md)
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

--- 

### Objectives

Implement a mastermind game, which can be played by a user "against" the computer.
This is a game where a player tries to guess the number combinations. At the end of each
attempt to guess the 4 number combinations, the computer will provide feedback whether the
player had guess a number correctly, or/and a number and digit correctly. A player must guess
the right number combinations within 10 attempts to win the game.

---

### Deliverables 

The major deliverables for this project are:
- Engineering Journal
  - document recording of all the work you do
- Implement Game Rules  
  - At the start of the game the computer will randomly select a pattern of four different
numbers from a total of 8 different numbers.
  - A player will have 10 attempts to guess the number combinations
  - At the end of each guess, computer will provide one of the following response
as feedback:
• The player had guess a correct number
• The player had guessed a correct number and its correct location
• The player’s guess was incorrect    

# Setting up the Application

For this project I will be using MERN stack. I've created the repo on Github and have initialized the package.json file in my project using `npm init`, followed by installing the required dependencies: 

```javascript
 "dependencies": {
    "@babel/runtime": "^7.16.7",
    "axios": "^0.24.0",
    "dotenv": "^10.0.0",
    "express": "^4.17.2",
    "mongoose": "^6.1.4",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "styled-components": "^5.3.3"
  },
  "devDependencies": {
    "@babel/core": "^7.16.7",
    "@babel/plugin-transform-runtime": "^7.16.7",
    "@babel/preset-env": "^7.16.7",
    "@babel/preset-react": "^7.16.7",
    "@webpack-cli/init": "^1.1.3",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.2.3",
    "babel-plugin-react-html-attrs": "^3.0.5",
    "babel-polyfill": "^6.26.0",
    "css-loader": "^6.5.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.7.2"
  }
  ```
  
To run my JavaScript code on the backend, I need to spin up a server that will compile my code. For this I used Express.js due to it's simplicity and ability to handle a lot of things out of the box. 

`npm install express`
 
I saved the server code in index.js file on the root level and connected mongoose as well.  

```javascript 
const app = express();
const port = process.env.PORT || 4000;

mongoose
  .connect('mongodb://localhost/mastermind', { useNewUrlParser: true })
  .then(() => console.log('We are Mongoosing!'))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Originm X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('client/dist'))
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
})

app.listen(port, () => {
  console.log(`Port ${port} is on fire!!`);
});
```
Running the server and dabase through package.json script `npm run start-watch`

# API Routes

Next step was creating the routes for the app. I used Express Router to create simple HTTP requests for the Random API and for adding the user data and solution data to the database. 

I ended up using only two routes, 'randomNum' and 'randomUniqueNum'. 

```javascript
router.get('/randomNum', (req, res, next) => {
  axios.get('http://www.random.org/integers/', { params: {num: 4, min: 0, max: 7, rnd: 'new', base: 10, col: 1, format: 'plain'}})
    .then(function (response) {
      if (response.data) {
        Game.create({ solution: response.data })
          .then((data) => res.json(data))
          .catch(next);
      } else {
        res.json({
          error: 'Missing random numbers'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
})

router.get('/randomUniqueNum', (req, res, next) => {
  axios.get('http://www.random.org/sequences/', { params: {num: 4, min: 0, max: 7, rnd: 'new', col: 1, format: 'plain'}})
    .then(function (response) {
      if (response.data) {
        Game.create({ solution: response.data.slice(0, 7) })
          .then((data) => res.json(data))
          .catch(next);
      } else {
        res.json({
          error: 'Missing random numbers'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
})
```

I used axios to connect to the Random.org api and make the neccessary calls. I got great results and started experimenting with different parameters to see and understand the extent of this API. 
The random integer API call doesn't have a unique parameter, so getting into unique values would require a different approach. 
I tested other API calls and found out that the API Sequence call provides unique numbers, however, it doesn't limit the range of numbers provided.
I ended up using a sequence call with a slice method on the result in order to keep the first 4 unique values. 

```   Game.create({ solution: response.data.slice(0, 7) })```

I tested the routes using Postman and received a result data in this form.

![Screen Shot 2022-01-08 at 12 47 34 AM](https://user-images.githubusercontent.com/78227541/148634818-6320d414-392b-418f-a0b1-d2a55d0291e3.png)

Once I received the response from the Axios call in App.jsx component, I converted the solution to an array with 4 elements. 

```javascript
let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            _this.solutionRow = data.split('')
            \\ _this.solution = [1,2,3,4]
```

# Database Choice 

For my database choice, I was looking into what LinkedIn was using. Reading up on Espresso, I realized I won't be able to use it for this project so I settled for MongoDB through Mongoose. 
I choose NoSQL database since my inputs and relationships between Schemas are pretty simple for such a small app. The app is read heavy so Mongoose is a great choice. 

Initially I created 2 schema models, one for the User and one for the current game that would keep track of the score and solution

```javascript 
const GameSchema = new Schema({
  solution: {type: String, required: true},
  userWon: {type: Boolean}
});

const Game = mongoose.model('Game', GameSchema);
```

```javascript
const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, match: /.+\@.+\..+/, unique: true},
  gamesWon: {type: Number, default: 0},
  gamesLost: {type: Number, default: 0}
});

const User = mongoose.model('User', UserSchema);
```


I connected to the database and used environmental variables to secure sensitive data and separate it from the application code. 

# Drawings

Once I had the app skeleton in place I started drawing out the app wireframes and state flow diagrams. 

![Screen Shot 2022-01-08 at 1 02 33 AM](https://user-images.githubusercontent.com/78227541/148635177-6f3368f3-230b-4749-9efa-e2005218f174.png)

![Screen Shot 2022-01-08 at 1 03 01 AM](https://user-images.githubusercontent.com/78227541/148635181-25fc44ee-fe17-4286-97cd-3b2791c0da9b.png)


While the inital drawings are not flattering, they helped me understand the bigger picture. 
It was easy to draw out the wireframe of the game, but working on the game logic proved to be a problem. 
I jumped into code too soon and ended up having to remove optional components and go back to the drawing board a couple of times. What really helped was keeping tracking of updates and the state flow. 

![Screen Shot 2022-01-08 at 1 16 10 AM](https://user-images.githubusercontent.com/78227541/148635541-67f6b85a-5dbf-45b5-a7cb-d6dc2c38d8b7.png)


For my notes, every day I was coding, I would write out certain tasks that I would like to accomplish for that day. 

For example, this Wednesday I was working on building the game board and figuring out the game logic
```
WEDNESDAY

- Create clickable options for a player to play (colors or numbers)
- Create clickable button that will check the winning condition
- If player gets to last attempt and fails, game over

Plan for today:

- Build the board
  - Figure out peg array
  - Figure out submit button
  - Figure out feedback array
  - Hide solution row
  - Format Input color options

Front end:
  LN colors on LinkedIn.com
  Inspected elements on LinkedIn main page: 
  Main blue #f1666C5 or #0a66c2
  Background #f3f2ef
```

While Wednesday was a nice and relaxing day, my Friday coding adventure turned out to be a lot more difficult 
```
FRIDAY

- Clicking on New Game should empty out the board
- Clicking on End game should freeze out the board or count as a loss
- Winning the game should appear text 'Play Again?' which maybe acts as new game click

++ Update components to match the difficulty
++ Clean up and refactor code
++ Use colors instead of numbers

***** Crashes after five input rows - find and resolve memory leak
***** Empty board on new game click - figure out how to reset state or move state and form function to app.jsx
***** Colors are not updating properly - separate the state for radio buttons
```

Thankfully, I was able to resolve all this by prioritizing the issues and deconstructing them into smaller, more feasible tasks. For example, for the memory leak, I looked at the console error that I was getting. This was one of the errors where searching online I couldn't get a straight answer, so I traced the code with console logs and by removing certain parts of the Board.jsx component until I found where the issue was. Next, I used the React Developer Tools Component tab to track the state updates for the feedbackRow. It turns out the feedbackRow was adding duplicate arrays after the 5th entry.

![Screen Shot 2022-01-08 at 2 06 06 AM](https://user-images.githubusercontent.com/78227541/148636978-838027b3-2ad1-4f64-aa00-b22b140cf99b.png)

I didn't have enough time to work on this issue and investigate further (2 hours before the deadline), so I simply added a conditional that removes any arrays added outside of the intended four (in newPeg.feedback). While this fix resolved the issue, given more time, I would investigate it further and eliminate the possibility of duplicate arrays forming.

```javascript
const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPeg = {
      one: addFormData.one,
      two: addFormData.two,
      three: addFormData.three,
      four: addFormData.four,
      feedback: feedback.length > 4 ? feedback.slice(-4) : feedback,
    };

    const newPegs = [...pegs, newPeg];
    setPegs(newPegs);
```
---

# Front End Look

For Front End I decided on a minimalistic approach that shows just enough to play the game. On the start page, you can view the Rules, Start a New Game and select your Difficulty. 

Once the game starts, a timer is shown along with the number of remaining guesses. Once the game ends, half of the components are being hidden to reduce clutter and maintain the simplistic look. 

![Screen Shot 2022-01-08 at 1 44 06 AM](https://user-images.githubusercontent.com/78227541/148636434-92759cc6-2975-49c4-bddb-9872a1312b23.png)


![Screen Shot 2022-01-08 at 1 44 58 AM](https://user-images.githubusercontent.com/78227541/148636397-633938bf-cd4f-4ed8-b2ab-8e46509881dd.png)


![Screen Shot 2022-01-08 at 1 45 41 AM](https://user-images.githubusercontent.com/78227541/148636440-22338a7a-849f-45ba-b944-9dbb63b34de4.png)

# Details on App.jsx

App component is the main class component holding all of the state and most of the functions which are passed down to other components. 

In this component, I am making the Axios calls to the Random API for random and unique integers based on the selected difficulty, where Easy mode gets duplicated entries and all the others get unique entries.  

```javascript
 getSolution() {
    const _this = this;

    if (this.state.currentDiff === 'Easy') {
      axios.get('/api/randomNum')
        .then(function (response) {
          if (response.data) {
            let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            _this.solutionRow = data.split('')
            _this.setState({
              solutionRow: _this.solutionRow
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      axios.get('/api/randomUniqueNum')
        .then(function (response) {
          if (response.data) {
            let data = response.data.solution.replace(/(\r\n|\n|\r)/gm, "");
            _this.solutionRow = data.split('')
            _this.setState({
              solutionRow: _this.solutionRow
            }, () => {
              console.log(_this.solutionRow)
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
```

A big portion and a challenge of this component was designing the game logic and winning conditions. 

```javascript
checkWinCondition(newPegs, allPegs, newFeedback) {
    let currentRow = newPegs.slice(0, 4);
    let feedbackRow = newPegs[4];
    let { solutionRow } = this;
    let remainingSolution = solutionRow.slice()
    let count = 0

    for (let i = 0; i < currentRow.length; i++) {

      if (currentRow[i].value === remainingSolution[i]) {
        remainingSolution.splice(i, 1, -1)
        feedbackRow[i] = 'match'
      } else if (remainingSolution.indexOf(currentRow[i].value) !== -1) {
        let index = remainingSolution.indexOf(currentRow[i].value)
        remainingSolution.splice(index, 1, -1)
        feedbackRow[i] = 'partial'
      } else {
        feedbackRow[i] = 'miss'
      }
    }

    feedbackRow.sort()
    this.trueFeedback.push(this.feedbackRow)

    this.setState(prevState => ({
      feedbackRow: {
        ...prevState.feedbackRow,
        [this.trueFeedback.length - 1]: this.feedbackRow
      }
    }))

    for (let i = 0; i < feedbackRow.length; i++) {
      if (feedbackRow[i] === 'match') {
        count++
      }

      if (count === 4) {
        this.updateScore('won')
      }
    }

    if (allPegs.length === 10 && count !== 4) {
      this.updateScore('lost')
    }
  }
```

This method is invoked in Board.jsx on form submit. Once the input rows have been populated with a color and a number value, I pass down the current selection of pegs, and a feedback array to compare for winning conditions. 

Setting up the matching condition was easy, if there is a match in the exact spot, I would simply map an element as a match in the feedback array. Same thing happens if it is a complete miss. 

The trouble with the logic starts when it's a partial hit. Using simple conditionals, once an element was checked, It would overwrite the next element's feedback status. I was able to get around this by by replacing the current value in the feedback array to -1 if it was a match or a partial hit. This way, once that solution spot was checked, it would ignore it for further checks and loops. 

Second challenge was setting up proper conditional for win/loss at the final guess. 
Initially, when a user is at row 10 and they guess correctly, both win and loss would trigger a state update. 
This was because I had these two conditional statements combined using ```else if```. I tried several ways of troubleshooting and what helped was to place several console logs: before the conditionals, inside each conditional and one after the conditionals. This way I could see which conditional would fire first and upon learning that a LOSS fires first, despite being a WIN, I decided to separate the conditionals. This worked and now it's updating properly. 

```javascript
  for (let i = 0; i < feedbackRow.length; i++) {
      if (feedbackRow[i] === 'match') {
        count++
      }

      if (count === 4) {
        this.updateScore('won')
      }
    }

    if (allPegs.length === 10 && count !== 4) {
      this.updateScore('lost')
    }
  }
```

# Details on Board.jsx

Board component is in charge of rendering the game board with the interactive input row, check button and table that stores the history of guesses. I have it set up so it receives the pegs and feedback arrays from App.jsx as empty initial state. Those are then updated on form change and on form submit, they are compared against the solution array received from the Random API call. 

```javascript
const Board = ({ test, data, checkWinCondition, feedbackRow, newGame, isChecked, updateColor, color, one, two, three, four, colorNum, gameOver, remainingGuesses, updateRowCount, restartGame, won, lost }) => {

  const initialState = '';
  const [pegs, setPegs] = useState(data);
  const [feedback, setFeedback] = useState(feedbackRow);
  const [addFormData, setAddFormData] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
  })
  const [feedbackData, setFeedbackData] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
  })
```

Here are the challenges faced while working on this component: 

Challenge: Render the game board in a way that mimics the original Mastermind game 

Action: I didn't know what Mastermind game was until I received this coding challenge. I looked up the game and saw a few YouTube ads from ages ago describing what the game was and how to play it. Once I got the hang of the rules and the style, I started drawing out the game and writing the game logic on paper. 

In order to render the table, I researched React tables and best practices when working with inputs. I created a table that would store a row containing the four chosen pegs and a feedback of four squares that would be compared against the solution. Beneath that I had a form with an input row with four spaces for an integer entry and a check button next to it. Originally I had the entire board rendered, but it felt too cluttered, so I decided to render only the current guesses and the input row. That way, it made more sense to have the requirement of displaying the number of remaining guesses. 

```javascript
 <div className='container'>
      {pegs ?
        <table className='tableGuesses'>
          <tbody>
            {pegs.map((peg, i) => (
              <tr key={i}>
                <td className='circle' style={{ backgroundColor: peg.one.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.two.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.three.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.four.color }}></td>
                {peg.feedback.map((feed, i) => (
                  <td key={i} className='feedback' style={{ backgroundColor: feed === 'match' ? 'green' : feed === 'partial' ? 'yellow' : 'white' }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        : null}
      <br></br>
      {gameOver ? null : <div className='remainingGuesses'>{`${remainingGuesses} guesses remaining`}</div>}
      {won === 1 ? <div className='score'>YOU WON!!!</div>
        : lost === 1 ? <div className='score'>YOU LOST :((</div>
          : null}
      {gameOver ? <div className='restartGame' onClick={restartGame}>Play Again?</div> : null}
      <br></br>
```


Now that I had the board, the next challenge was to convert the numbered inputs into corresponding colors. 

In App.jsx state, I added a color and num key for each of the input options. This allows the input element to store both a color and a number - color for rendering the UI and number for comparing to the solution code. Also, separating the state for all of the input elements, prevents the radio buttons from copy/pasting the color to each other. 

```javascript
    one: { color: 'white', num: 0 },
      two: { color: 'white', num: 0 },
      three: { color: 'white', num: 0 },
      four: { color: 'white', num: 0 },
```

Back in Board.jsx, each of the input elements has been converted into a radio button. On click, it would populate the radio button with the corresponding color and the peg array with a new element containing a color and number keys.

```javascript
 <input className='circle'
            type='radio'
            name='one'
            required='required'
            placeholder='one'
            value={one.num}
            onClick={handleAddFormChange}
            id={one.color}
            style={{ backgroundColor: one.color }}
          />
```

```javascript
 const handleAddFormChange = async (event) => {
    await updateColor(event)

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const fieldColor = event.target.id;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = { value: fieldValue, color: fieldColor };

    console.log('newFormData', newFormData)
    setAddFormData(newFormData)
  };
```

This way when comparing the input to the solution and checking for the winning conditions, I am still comparing number values, while the front end is rendering the color value of the same element. 

# Details on Rules.jsx

Rules component is rendering a Rules button which, once clicked, shows a list of rules for the game. I was thinking how I could have a couple of rule lines appear on homepage, however, it was too cluttering and I would need a lot of space to properly explain the rules. I decided to use a Rule button to show and hide the rules so the user can read them at their convenience. 

```javascript
 {this.props.newGame ? null :
          <div>
            <StyledButton onClick={this.props.startNewGame}>Start Game</StyledButton>
            <StyledButton onClick={this.showRules}>{rulesButton}</StyledButton>
            {!this.state.showRules ? this.state.ruleInfo.map((rule, i) => (
              <h5 key={i}>{rule}</h5>)) : ''}
            <div className='difficulty'>
              {this.state.difficulty.map((item, i) => (
                <div onClick={this.props.updateDifficulty} key={i} id={item}>{item}</div>
              ))}
            </div>
          </div>
      }
```

Also, I've added four difficulties (Easy, Normal, Hard and Unfair). Depending on which difficulty is clicked, a different explanation is rendered. I really wanted to get creative with Unfair, by blocking some of the input buttons and doubling the available colors for the inputs, however, the logic for that would require a lot more time, so I prioritized time scarsity and difficulty description vaguenes in this difficulty mode. 

```javascript
  const currentDifficulty = this.props.currentDiff === 'Easy' ? <div>Timer at 90 sec with duplicate pegs</div>
      : this.props.currentDiff === 'Normal' ? <div>Timer at 60 sec with unique pegs</div>
        : this.props.currentDiff === 'Hard' ? <div>Timer at 30 sec with unique pegs</div>
          : this.props.currentDiff === 'Unfair' ? <div>Don't think, just play.</div>
            : ''
```
# Details on Timer.jsx

Timer component renders a countdown timer once the game starts. 

I used this variable and conditional to differentiate the timers for each difficulty setting. 
Given it is a functional component, I used useState and useEffect to update the timer. 

Challenge I had a memory leak which was resolved by adding the cleanup function in useEffect (clearTimeout)

```javascript
const Timer = ({ updateScore, currentDiff, gameOver }) => {
  console.log('currentDiff:', currentDiff)
  let time = currentDiff === 'Normal' ? 60 : currentDiff === 'Hard' ? 30 : currentDiff === 'Unfair' ? 10 : 90
  let [timer, setTimer] = React.useState(time)

  React.useEffect(() => {
   timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)

   if (timer === 0) {
     return updateScore('lost')
   }

   return () => {
    clearTimeout(timer);
  }
}, [timer]);

  return (
    <div className="timer">
      {gameOver === true ? null :
      <div>Timer: {timer} sec</div>
    }
    </div>
  );
}
```

# Details on Input.jsx

Input component renders the colors from the color array (this.colors in App.jsx) by using the map method. 

```javascript
import React from 'react';
import { StyledButton } from './Buttons/StyledButton.jsx';
import '../stylesheets/input.css'

const Input = ({ colors, handleColorClick }) => (
  <div className='input'>
    {colors.map((color, i) => (
      <div key={i} className='circle' onClick={handleColorClick} value={i} id={color}></div>
    ))}
  </div>
);

export default Input;
```

The colors are displayed in-line and if the array is expanded with newer colors, those would also appear on the browser, provided that their class has a corresponding color to it in CSS. 

```javascript 
    this.colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'brown'];
```

# Favorite Code 

My favorite part of the project was working on the game logic and making the board. The reason why this code is my favorite is because I spent a lot of time thinking about it, both in code and on paper. 

```javascript
 <div className='container'>
      {pegs ?
        <table className='tableGuesses'>
          <tbody>
            {pegs.map((peg, i) => (
              <tr key={i}>
                <td className='circle' style={{ backgroundColor: peg.one.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.two.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.three.color }}></td>
                <td className='circle' style={{ backgroundColor: peg.four.color }}></td>
                {peg.feedback.map((feed, i) => (
                  <td key={i} className='feedback' style={{ backgroundColor: feed === 'match' ? 'green' : feed === 'partial' ? 'yellow' : 'white' }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        : null}
      <br></br>
      {gameOver ? null : <div className='remainingGuesses'>{`${remainingGuesses} guesses remaining`}</div>}
      {won === 1 ? <div className='score'>YOU WON!!!</div>
        : lost === 1 ? <div className='score'>YOU LOST :((</div>
          : null}
      {gameOver ? <div className='restartGame' onClick={restartGame}>Play Again?</div> : null}
      <br></br>
```
      
# Future Improvements List

- Improve difficulty system by increasing the number of pegs a user has to guess
- Increase number of colors available for a guess
- Deploy on AWS EC2
- Implement user service which stores users on a database and tracks email, password, sessions played, win/loss ratio
- Research and implement OATH
- Implement testing with Jest
- Scale horizontally with a load balancer and 4 servers accross 4 AWS EC2 t2.micro instances
- Test performance with K6 and Loader.io prior and post scaling
