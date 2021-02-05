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
  Text,
  View,
} from 'react-native';

const defaultBoard: Array<Array<number | null>> = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App: () => ReactNode = () => {
  const [board, updateBoard] = useState(defaultBoard);
  const [player, updatePlayer] = useState(1);
  const [turn, countTurn] = useState(1);

  useEffect(() => {
    resetBoard();
  }, []);

  const displayWinnerAlert = (winner: number) => {
    const msg = winner > 0 ? `Player ${winner} wins!` : 'Tie Game';
    Alert.alert('Game Over', msg, [
      {text: 'Rematch', onPress: () => resetBoard()},
    ]);
  };

  const resetBoard = () => {
    console.log('reset board...');
    countTurn(1);
    updateBoard(defaultBoard);
  };

  const updateGameBoard = (row: number, cell: number) => {
    board[row].splice(cell, 1, player);
    board.splice(row, 1, board[row]);

    updatePlayer(player === 1 ? 0 : 1);
    updateBoard(board);
    countTurn(turn + 1);
    gameStatus();
  };

  const checkArray = (playerMark: number, array: Array<number | null>) => {
    return array.filter((x) => x === playerMark).length === 3;
  };

  const gameStatus = () => {
    const pOneMark = 1,
      pTwoMark = 0,
      rowOne = board[0],
      rowTwo = board[1],
      rowThree = board[2];

    if (turn > 4) {
      // check rows (horizontal)
      const pOneRowOne = checkArray(pOneMark, rowOne);
      const pOneRowTw0 = checkArray(pOneMark, rowTwo);
      const pOneRowThree = checkArray(pOneMark, rowThree);

      const pTwoRowOne = checkArray(pTwoMark, rowOne);
      const pTwoRowTw0 = checkArray(pTwoMark, rowTwo);
      const pTwoRowThree = checkArray(pTwoMark, rowThree);

      // check columns (vertical)
      const pOneColOne = checkArray(pOneMark, [
        rowOne[0],
        rowTwo[0],
        rowThree[0],
      ]);
      const pOneColTwo = checkArray(pOneMark, [
        rowOne[1],
        rowTwo[1],
        rowThree[1],
      ]);
      const pOneColThree = checkArray(pOneMark, [
        rowOne[2],
        rowTwo[2],
        rowThree[2],
      ]);

      const pTwoColOne = checkArray(pTwoMark, [
        rowOne[0],
        rowTwo[0],
        rowThree[0],
      ]);
      const pTwoColTwo = checkArray(pTwoMark, [
        rowOne[1],
        rowTwo[1],
        rowThree[1],
      ]);
      const pTwoColThree = checkArray(pTwoMark, [
        rowOne[2],
        rowTwo[2],
        rowThree[2],
      ]);

      // check diagonal
      const pOneDiagOne = checkArray(pOneMark, [
        rowOne[0],
        rowTwo[1],
        rowThree[2],
      ]);
      const pOneDiagTwo = checkArray(pOneMark, [
        rowOne[2],
        rowTwo[1],
        rowThree[0],
      ]);

      const pTwoDiagOne = checkArray(pTwoMark, [
        rowOne[0],
        rowTwo[1],
        rowThree[2],
      ]);
      const pTwoDiagTwo = checkArray(pTwoMark, [
        rowOne[2],
        rowTwo[1],
        rowThree[0],
      ]);

      if (
        pOneRowOne ||
        pOneRowTw0 ||
        pOneRowThree ||
        pOneColOne ||
        pOneColTwo ||
        pOneColThree ||
        pOneDiagOne ||
        pOneDiagTwo
      ) {
        displayWinnerAlert(1);
      }

      if (
        pTwoRowOne ||
        pTwoRowTw0 ||
        pTwoRowThree ||
        pTwoColOne ||
        pTwoColTwo ||
        pTwoColThree ||
        pTwoDiagOne ||
        pTwoDiagTwo
      ) {
        displayWinnerAlert(2);
      }
    }

    if (turn === 9) {
      console.log('board full');
      displayWinnerAlert(0);
    }
  };

  return (
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
