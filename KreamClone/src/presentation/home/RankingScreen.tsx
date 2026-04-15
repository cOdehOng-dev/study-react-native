import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_RANKING } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'Ranking'>;

export default function RankingScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="랭킹" onBack={() => navigation.goBack()} />
      <FlatList
        data={MOCK_RANKING}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image source={{ uri: item.imageUri }} style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.price}>{item.buyPrice.toLocaleString()}원</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rank: { fontSize: 18, fontWeight: '900', color: colors.primary, width: 24, textAlign: 'center' },
  thumb: { width: 72, height: 72, borderRadius: 8, backgroundColor: colors.gray100 },
  info: { flex: 1 },
  brand: { fontSize: 12, color: colors.gray500 },
  name: { fontSize: 14, fontWeight: '700', color: colors.primary, marginVertical: 2 },
  price: { fontSize: 14, fontWeight: '700', color: colors.accent },
  separator: { height: 16 },
});
