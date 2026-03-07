import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import UserContext, { UserConsumer } from "../contexts/User";

const Input = () => {
  const [name, setName] = useState("");
  const { dispatch } = useContext(UserContext);

  return (
    <TextInput
      style={styles.input}
      value={name}
      onChangeText={(text) => setName(text)}
      onSubmitEditing={() => {
        dispatch(name);
        setName("");
      }}
      placeholder="Enter a name..."
      autoCapitalize="none"
      autoComplete={false}
      returnKeyType="done"
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#606060",
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 10,
    fontSize: 24,
  },
});
