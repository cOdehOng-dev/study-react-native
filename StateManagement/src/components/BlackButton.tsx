import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

function BlackButton({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      android_ripple={{ color: 'white' }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default BlackButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
