import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddTodo from "./src/components/AddTodo";
import DateHead from "./src/components/DateHead";
import Empty from "./src/components/Empty";
import TodoList from "./src/components/TodoList";
import todosStorages from "./storages/todosStorages";

function App() {
  const today = new Date();
  const [todos, setTodos] = useState([
    { id: 1, text: "리액트 네이티브 공부하기", done: false },
    { id: 2, text: "운동하기", done: true },
    { id: 3, text: "점심 먹기", done: false },
  ]);

  /**
   * 불러오기
   * 마운트 시 딱 한번만 실행
   *
   */
  useEffect(() => {
    todosStorages.get().then(setTodos).catch(console.error);
  }, []);

  /**
   * todos가 변경될 때마다 실행
   */
  useEffect(() => {
    todosStorages.set(todos).catch(console.error);
  }, [todos]);

  const onInsert = (text) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = (id) => {
    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["bottom"]} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: undefined })}
          style={styles.avoid}
        >
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  avoid: {
    flex: 1,
  },
});

export default App;
