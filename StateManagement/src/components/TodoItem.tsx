import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BlackButton from './BlackButton';
import useTodosActions from '../hooks/useTodosAction';

type Props = {
  id: number;
  text: string;
  done: boolean;
};

function TodoItem({ id, text, done }: Props) {
  const { toggle, remove } = useTodosActions();
  const onToggle = () => {
    toggle(id);
  };
  const onRemove = () => {
    remove(id);
  };
  return (
    <View style={styles.todo}>
      <Pressable style={styles.toggle} onPress={onToggle}>
        <Text style={done && styles.doneText}>{text}</Text>
      </Pressable>
      <BlackButton onPress={onRemove} title="삭제" />
    </View>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
  },
  toggle: {
    justifyContent: 'center',
    flex: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
});
