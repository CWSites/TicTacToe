/**
 * Tic-Tac-Toe React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {ReactNode, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const defaultBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App: () => ReactNode = () => {
  const [board, updateBoard] = useState(defaultBoard);
  const [player, updatePlayer] = useState(1);

  const updateGameBoard = (value: number | null, row: number, cell: number) => {
    const updatedRow = board[row];

    updatedRow.splice(cell, 1, player);
    board.splice(row, 1, updatedRow);

    updatePlayer(player === 1 ? 0 : player);
    updateBoard(board);
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
                  onPress={() => updateGameBoard(value, rowIndex, cellIndex)}
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
