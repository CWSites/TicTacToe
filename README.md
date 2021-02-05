# TicTacToe

Friendly game of tic-tac-toe utilizing React Native & modern features of React (hooks)

### To start run the following commands

- `cd TicTacToe`
- `npx react-native start`
- `npx react-native run-ios`

## Acceptance Criteria

- [x] Allow 2 players to play tic tac toe (Follow the rules of tic-tac-toe)
- [x] Have a 3x3 grid on which the players can play
- [x] Allow the players to take turns marking spaces on the 3x3 grid
- [x] Recognize when a player has won and declare that player as victorious
- [ ] Allow the user to start a new game

## Game Rules

- The game is played on a grid that's 3 squares by 3 squares.
- The first player is `X`, the second player is `O`
- The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner.
- When all 9 squares are full, the game is over.

## Assumptions

- The players will be using the same device, taking turns
- The first player to act will be `X`

## Constraints

- No memory of previous games
- When there is a winner, the game will end
- No unit testing in place for the sake of time

## Troubleshooting

- Since I work on OS X I decided to move forward with the React Native [directions](https://reactnative.dev/docs/environment-setup) for using Xcode & CocoaPods.
- I had latest Xcode installed which is 12.4
- I ran into issues where iOS was refusing to build due to cocoa pods using iOS version 8.0 which had been deprecated in Xcode version 12.
- Spent about 30 minutes troubleshooting and found an [issue](https://github.com/CocoaPods/CocoaPods/issues/9884) on the CocoaPods repo.
- Was able to get it sucessfully built after removing `TicTacToe/ios/TicTacToe.xcworkspace`, running `pod update` and then `pod install` prior to starting the build.
