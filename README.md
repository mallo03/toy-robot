# Toy Robot

React app for the Toy Robot challenge.

## Getting started

Requires Node.js.

```bash
# install dependencies
npm install
 
# start dev server (opens at http://localhost:5173)
npm run dev
 
# run tests
npm test
```

## How to use
1. Enter a valid X and Y position, choose a direction, and press Place.
2. Use Move, Left and Right to drive the robot around.
3. Press Report to see the current position and direction.
4. Have a play with it!

## Assumptions

- Commands are issued as buttons and a form.
- The robot starts off the table.
- 0,0 is the bottom left of the grid. North increases Y and East increases X.
- A move that would make the robot move off the table is ignored. The error is shown in output.
- The command visual output if it succeeded or failed only shows the most recent one.