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

const defaultBoard = [1, 0, 1, 0, 1, 0, null, 0, null];

const App: () => ReactNode = () => {
  const [board, updateBoard] = useState(defaultBoard);

  const renderXO = (num: number | null) => {
    return num === 1 ? 'X' : num === 0 ? 'O' : null;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.board}>
          <View style={styles.row}>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[0])}</Text>
            </View>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[1])}</Text>
            </View>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[2])}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[3])}</Text>
            </View>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[4])}</Text>
            </View>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[5])}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[6])}</Text>
            </View>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[7])}</Text>
            </View>
            <View style={styles.square}>
              <Text style={styles.mark}>{renderXO(board[8])}</Text>
            </View>
          </View>
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
    // backgroundColor: '#9b59b6',
    flexDirection: 'row',
    flexGrow: 1,
    height: '33.33%',
  },
  square: {
    alignItems: 'center',
    // borderColor: '#e74c3c',
    borderStyle: 'solid',
    borderWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    width: '33.33%',
  },
  mark: {
    // backgroundColor: '#ecf0f1',
    color: '#34495e',
    display: 'flex',
    fontSize: 80,
    fontWeight: '700',
  },
});

export default App;
