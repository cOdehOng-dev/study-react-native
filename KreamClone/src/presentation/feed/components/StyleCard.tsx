import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import { StyleModel } from '../../../domain/model/StyleModel';
import { colors } from '../../theme/colors';

const CARD_SIZE = (Dimensions.get('window').width - 3) / 2;

interface Props {
  style: StyleModel;
  onPress: (style: StyleModel) => void;
}

export function StyleCard({ style, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(style)} activeOpacity={0.9}>
      <Image source={{ uri: style.imageUri }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.likeText}>♥ {style.likeCount.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: CARD_SIZE, height: CARD_SIZE },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  likeText: { color: colors.background, fontSize: 11, fontWeight: '700' },
});
