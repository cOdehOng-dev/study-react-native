import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_BRANDS } from '../../data/mock/brandsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'BrandList'>;

export default function BrandListScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="브랜드" onBack={() => navigation.goBack()} />
      <FlatList
        data={MOCK_BRANDS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BrandDetail', { brandId: item.id })}>
            <Image source={{ uri: item.logoUri }} style={styles.logo} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.count}>{item.productCount.toLocaleString()}개</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: 12 },
  card: {
    flex: 1, margin: 6, padding: 16,
    backgroundColor: colors.gray100, borderRadius: 8,
    alignItems: 'center', gap: 8,
  },
  logo: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.gray200 },
  name: { fontSize: 14, fontWeight: '700', color: colors.primary },
  count: { fontSize: 12, color: colors.gray500 },
});
