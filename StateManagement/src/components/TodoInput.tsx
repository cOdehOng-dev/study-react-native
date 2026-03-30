import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import BlackButton from './BlackButton';
import useTodosActions from '../hooks/useTodosAction';

function TodoInput() {
  const [text, setText] = useState('');
  const { add } = useTodosActions();

  const onPress = () => {
    add(text);
    setText('');
  };

  return (
    <View style={styles.inpuWrapper}>
      <TextInput
        style={styles.input}
        placeholder="할 일을 입력하세요"
        value={text}
        onChangeText={setText}
      />
      <BlackButton onPress={onPress} title="등록" />
    </View>
  );
}

export default TodoInput;

const styles = StyleSheet.create({
  inpuWrapper: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});
