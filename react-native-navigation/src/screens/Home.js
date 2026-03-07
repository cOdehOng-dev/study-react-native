import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <Button
          title="go to the list screen"
          onPress={() => navigation.navigate("List")}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    marginBottom: 10,
  },
});
