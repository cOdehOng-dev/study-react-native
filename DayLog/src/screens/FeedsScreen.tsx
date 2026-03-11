import React from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';

const FeedsScreen = () => {
  return (
    <View style={styles.block}>
      <FloatingWriteButton />
    </View>
  );
};

export default FeedsScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});
