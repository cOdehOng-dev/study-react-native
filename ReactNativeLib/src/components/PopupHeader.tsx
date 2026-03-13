import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  onClose?: () => void;
};
function PopupHeader({ title, onClose }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ width: 96 }} />
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.iconContainer} onPress={onClose}>
        <Image
          style={styles.icon}
          source={require('../../assets/images/close.png')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111111',
  },
  iconContainer: {
    width: 96,
    alignItems: 'flex-end',
    paddingEnd: 8,
  },
  icon: {
    width: 34,
    height: 34,
  },
});

export default PopupHeader;
