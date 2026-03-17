import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  onPress?: () => void;
  title: string;
  hasMarginBottom?: boolean;
  theme?: 'primary' | 'secondary';
};

function CustomButton({
  onPress,
  title,
  hasMarginBottom,
  theme = 'primary',
}: Props) {
  const isPrimary = theme === 'primary';

  return (
    <View
      style={[styles.block, styles.overflow, hasMarginBottom && styles.margin]}
    >
      <Pressable
        onPress={onPress}
        style={onPress => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && onPress && { opacity: 0.5 },
        ]}
        android_ripple={{ color: isPrimary ? '#ffffff' : '#6200ee' }}
      >
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#6200ee',
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
