import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "./Container";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./screens/Stack";
import TabNavigation from "./screens/navigations/Tab";

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
