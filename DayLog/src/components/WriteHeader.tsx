import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackNavigationProp } from '../navigationstack';
import TransParentCircleButton from './TransParentCircleButton';

const WriteHeader = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrppaer}>
        <TransParentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>

      <View style={styles.buttons}>
        <TransParentCircleButton
          name="delete-forever"
          color="#ef5350"
          hasMarginRight
        />
        <TransParentCircleButton name="check" color="#009688" />
      </View>
    </View>
  );
};

export default WriteHeader;

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrppaer: {
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
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
});
