import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type TagType = '즉시구매가' | '즉시판매가';

interface Props {
  type: TagType;
  price: number;
}

export const PriceTag: React.FC<Props> = ({ type, price }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{type}</Text>
    <Text style={styles.price}>{price.toLocaleString()}원</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  label: { fontSize: 11, color: colors.gray500, marginBottom: 2 },
  price: { fontSize: 18, fontWeight: '800', color: colors.accent },
});
