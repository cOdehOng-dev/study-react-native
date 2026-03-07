import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const refName = useRef(null);
  const refEmail = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 설정
    console.log("Form component mounted\n");
    refName.current.focus();
    // 컴포넌트가 언마운트 될 때 정리(clean-up) 함수 실행
    return () => console.log("Form component unmounted\n");
  }, []);

  useEffect(() => {
    console.log(`name: ${name}, email: ${email}\n`);
  }, [email]);

  return (
    <View>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <TextInput
        ref={refName}
        returnKeyType="text"
        onSubmitEditing={() => refEmail.current.focus()}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={(name) => setName(name)}
        placeholder="name"
      />
      <TextInput
        ref={refEmail}
        returnKeyType="done"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#757575",
    padding: 10,
    marginVertical: 10,
    width: 200,
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    margin: 10,
  },
});
