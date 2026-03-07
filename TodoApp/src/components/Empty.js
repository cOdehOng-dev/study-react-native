import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

function Empty() {
  return (
    <View style={styles.block}>
      <Image
        source={require("../../assets/young_and_happy.png")}
        style={styles.image}
      />
      <Text style={styles.description}>야호! 할일이 없습니다</Text>
    </View>
  );
}

export default Empty;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white'
  },
  description: {
    fontSize: 24,
    color: "#9e9e9e",
  },
  image: {
    width: 240,
    height: 179,
    marginBottom: 16,
  },
});
