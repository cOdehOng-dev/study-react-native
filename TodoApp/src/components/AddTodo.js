import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

function AddTodo() {
  const [text, setText] = useState("");
  const button = (
    <View style={styles.buttonStyle}>
      <Image source={require("../../assets/icons/add_white/add_white.png")} />
    </View>
  );

  const onPress = () => {
    setText("");
    Keyboard.dismiss();
  };
  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      {Platform.select({
        ios: (
          <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            {button}
          </TouchableOpacity>
        ),
        android: (
          <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={onPress}>
              {button}
            </TouchableNativeFeedback>
          </View>
        ),
      })}
    </View>
  );
}

export default AddTodo;

const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingHorizontal: 16,
    borderColor: "#bdbdbd",
    borderTopWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    backgroundColor: "#26a69a",
    borderRadius: 24,
  },
  circleWrapper: {
    overflow: "hidden",
    borderRadius: 24,
  },
});
