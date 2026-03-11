import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  title?: string;
  body?: string;
  onChangeTitle?: (text: string) => void;
  onChangeBody?: (text: string) => void;
};

const WriteEditor = ({ title, body, onChangeTitle, onChangeBody }: Props) => {
  const bodyRef = useRef<TextInput>(null);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        value={title}
        onChangeText={onChangeTitle}
        returnKeyType="next"
        onSubmitEditing={() => {
          bodyRef.current?.focus();
        }}
      />
      <TextInput
        placeholder="당신의 오늘을 기록해주세요"
        style={styles.bodyInput}
        value={body}
        onChangeText={onChangeBody}
        textAlignVertical="top"
        multiline
        ref={bodyRef}
      />
    </View>
  );
};

export default WriteEditor;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});
