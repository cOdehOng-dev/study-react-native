import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Todos from './Todos';
import TodoInput from './TodoInput';

function TodoApp() {
  return (
    <SafeAreaView style={styles.block}>
      <Todos />
      <TodoInput />
    </SafeAreaView>
  );
}

export default TodoApp;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});
