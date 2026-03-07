import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Item = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: "#ffffff",
      headerLeft: ({ onPress, tintColor }) => {
        return (
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color={tintColor}
            style={{ marginLeft: 11 }}
            onPress={onPress}
          />
        );
      },
      headerRight: ({ tintColor }) => {
        return (
          <MaterialCommunityIcons
            name="home-variant"
            size={30}
            color={tintColor}
            style={{ marginRight: 11 }}
            onPress={() => navigation.popToTop()}
          />
        );
      },
    });
  }, []);
  const { id, name } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Item</Text>
      <Text style={styles.text}>ID: {id}</Text>
      <Text style={styles.text}>Name: {name}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    marginBottom: 10,
  },
});
