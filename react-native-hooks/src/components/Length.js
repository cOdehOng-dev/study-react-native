import { Button, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";

const getLength = (text) => {
  console.log(`Target Text: ${text}`);
  return text.length;
};

const list = ["JavaScript", "Expo", "Expo", "React Native"];

let idx = 0;
const Length = () => {
  const [text, setText] = useState(list[0]);

  const _onPress = () => {
    ++idx;
    if (idx < list.length) setText(list[idx]);
  };
  const length = useMemo(() => getLength(text), [text]);

  return (
    <View>
      <Text style={styles.text}>Text: {text}</Text>
      <Text style={styles.text}>Length: {length}</Text>
      <Button title='Get Length' onPress={_onPress}/>
    </View>
  );
};

export default Length;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});
