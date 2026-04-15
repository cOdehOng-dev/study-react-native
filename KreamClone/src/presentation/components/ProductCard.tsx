import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import FastImage from 'react-native-fast-image';

type Props = {
  brand: string;
  name: string;
  price: number;
  imageUri?: string;
  onPress?: () => void;
};

export const ProductCard = ({
  brand,
  name,
  price,
  imageUri,
  onPress,
}: Props) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.imageBox}>
      {imageUri ? (
        <FastImage source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
    </View>
    <Text style={styles.brand} numberOfLines={1}>
      {brand}
    </Text>
    <Text style={styles.name} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.priceLabel}>즉시 구매가</Text>
    <Text style={styles.price}>{price.toLocaleString()}원</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { width: 150 },
  imageBox: {
    width: 150,
    height: 200,
    // aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.gray100,
    marginBottom: 8,
  },
  // image: { width: '100%', height: '100%', resizeMode: 'contain' },
  image: { width: 150, height: 200, resizeMode: 'cover' },
  imagePlaceholder: { flex: 1, backgroundColor: colors.gray100 },
  brand: { fontSize: 12, color: colors.gray500, marginBottom: 2 },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  priceLabel: { fontSize: 11, color: colors.gray500 },
  price: { fontSize: 14, fontWeight: '700', color: colors.primary },
});
