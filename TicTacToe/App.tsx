/**
 * Tic-Tac-Toe React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {ReactNode, useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';

type Row = Array<null | Player>;
type Player = 0 | 1;

const playerOneMark: Player = 1;
const playerTwoMark: Player = 0;

const defaultBoard: Array<Row> = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App: () => ReactNode = () => {
  const [board, updateBoard] = useState<Array<Row>>(defaultBoard);
  const [player, updatePlayer] = useState<Player>(1);
  const [turn, countTurn] = useState(1);
  const [boardReset, updateBoardReset] = useState(false);

  useEffect(() => {
    if (boardReset) {
      console.log(board);
      updateBoardReset(false);
    }
  }, [boardReset]);

  const displayWinnerAlert = (winner: number) => {
    const msg = winner > 0 ? `Player ${winner} wins!` : 'Tie Game';
    Alert.alert('Game Over', msg, [
      {text: 'Rematch', onPress: () => resetBoard()},
    ]);
  };

  const resetBoard = () => {
    // TO-DO: figure out why `defaultBoard` doesn't work here.
    updateBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    countTurn(1);
    updatePlayer(1);
    updateBoardReset(true);
  };

  const updateGameBoard = (row: number, cell: number) => {
    // update row
    board[row].splice(cell, 1, player);

    // update board
    board.splice(row, 1, board[row]);

    updatePlayer(player === playerOneMark ? playerTwoMark : playerOneMark);
    updateBoard(board);
    countTurn(turn + 1);
    gameStatus();
  };

  const checkArray = (playerMark: Player, array: Row) => {
    return array.filter((x) => x === playerMark).length === 3;
  };

  const checkSolutions = (playerMark: Player, solutions: Array<Row>) => {
    for (let i = 0; i < solutions.length; i++) {
      if (checkArray(playerMark, solutions[i])) {
        return true;
      }
    }

    return false;
  };

  const gameStatus = () => {
    if (turn > 4) {
      const rowOne = board[0],
        rowTwo = board[1],
        rowThree = board[2];

      const colOne = [rowOne[0], rowTwo[0], rowThree[0]],
        colTwo = [rowOne[1], rowTwo[1], rowThree[1]],
        colThree = [rowOne[2], rowTwo[2], rowThree[2]];

      const diagOne = [rowOne[0], rowTwo[1], rowThree[2]],
        diagTwo = [rowOne[2], rowTwo[1], rowThree[0]];

      const possibleSolutions: Array<Row> = [
        colOne,
        colTwo,
        colThree,
        diagOne,
        diagTwo,
        rowOne,
        rowTwo,
        rowThree,
      ];

      if (checkSolutions(playerOneMark, possibleSolutions)) {
        displayWinnerAlert(1);
      } else if (checkSolutions(playerTwoMark, possibleSolutions)) {
        displayWinnerAlert(2);
      } else {
        if (turn === 9) {
          displayWinnerAlert(0);
        }
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((value, cellIndex) => (
                <Pressable
                  key={`${rowIndex}-${cellIndex}`}
                  onPress={() => updateGameBoard(rowIndex, cellIndex)}
                  style={styles.square}>
                  <View>
                    <Text style={styles.mark}>
                      {value === 1 ? 'X' : value === 0 ? 'O' : ''}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  board: {
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
    height: '33.33%',
  },
  square: {
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    width: '33.33%',
  },
  mark: {
    color: '#34495e',
    display: 'flex',
    fontSize: 80,
    fontWeight: '700',
  },
});

export default App;
