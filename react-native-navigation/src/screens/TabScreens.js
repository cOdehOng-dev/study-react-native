import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const Mail = () => {
  return (
    <Container>
      <StyledText text="Main" />
    </Container>
  );
};

export const Meet = () => {
  return (
    <Container>
      <StyledText text="Meet" />
    </Container>
  );
};

export const Settings = () => {
  return (
    <Container>
      <StyledText text="Settings" />
    </Container>
  );
};

const TabScreens = () => {
  return (
    <View>
      <Text>TabScreens</Text>
    </View>
  );
};

export default TabScreens;

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const StyledText = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#54b7f9"
  },
  text: {
    fontSize: 30,
    color: "#fff",
  },
});
