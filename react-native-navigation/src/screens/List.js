import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const items = [
  { id: 1, name: "React Native" },
  { id: 2, name: "React Navigation" },
  { id: 3, name: "Hanbit" },
];

const List = ({navigation}) => {
  const _onPress = (item) => {
    navigation.navigate('Detail', { id: item.id, name: item.name });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>List</Text>
      {items.map((item) => (
        <Button
          key={item.id}
          title={item.name}
          onPress={() => _onPress(item)}
        />
      ))}
    </View>
  );
};

export default List;

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
