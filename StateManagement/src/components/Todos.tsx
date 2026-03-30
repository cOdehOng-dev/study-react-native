import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TodoItem from './TodoItem';
import useTodos from '../hooks/useTodos';

function Line() {
  return <View style={styles.separator} />;
}

function Todos() {
  const todos = useTodos();
  return (
    <FlatList
      style={styles.todos}
      data={todos}
      renderItem={({ item }) => (
        <TodoItem id={item.id} done={item.done} text={item.text} />
      )}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={Line}
      ListFooterComponent={Line}
    />
  );
}

export default Todos;

const styles = StyleSheet.create({
  todos: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
});
