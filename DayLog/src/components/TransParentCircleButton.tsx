import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  name: string;
  color: string;
  hasMarginRight?: boolean;
  onPress?: () => void;
};

const TransParentCircleButton = ({
  name,
  color,
  hasMarginRight,
  onPress,
}: Props) => {
  return (
    <View
      style={[styles.iconButtonWrapper, hasMarginRight && styles.marginRight]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.iconButton,
          Platform.OS === 'ios' && pressed && { backgroundColor: '#ededed' },
        ]}
        onPress={onPress}
      >
        <Icon name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
};

export default TransParentCircleButton;

const styles = StyleSheet.create({
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  marginRight: {
    marginRight: 8,
  },
});
