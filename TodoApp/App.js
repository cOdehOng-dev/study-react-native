import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateHead from "./src/components/DateHead";
import AddTodo from "./src/components/AddTodo";
import Empty from "./src/components/Empty";

function App() {
  const today = new Date();
  console.log(today);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["bottom"]} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: "padding", android: undefined})}
          style={styles.avoid}
        >
          <DateHead date={today} />
          <Empty />
          <AddTodo />
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
