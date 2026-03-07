import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onRemove }) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({ item }) => (
        <TodoItem id={item.id} text={item.text} done={item.done} onToggle={onToggle} onRemove={onRemove} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default TodoList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
});
