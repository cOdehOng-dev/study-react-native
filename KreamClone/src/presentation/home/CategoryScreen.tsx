import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { ProductCard } from '../components/ProductCard';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

const CATEGORIES = ['전체', '스니커즈', '어패럴', '아우터', '탑', '팬츠', '가방', '모자', '기타'];

type Props = HomeStackScreenProps<'Category'>;

export default function CategoryScreen({ navigation, route }: Props) {
  const [selected, setSelected] = useState(route.params?.categoryId ?? '전체');
  const filtered = selected === '전체'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.category === selected);

  return (
    <SafeAreaWrapper>
      <Header title="카테고리" onBack={() => navigation.goBack()} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.tabs}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.tab, selected === cat && styles.tabActive]}
                onPress={() => setSelected(cat)}>
                <Text style={[styles.tabText, selected === cat && styles.tabTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              brand={item.brand}
              name={item.name}
              price={item.buyPrice}
              imageUri={item.imageUri}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 8 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: colors.gray200,
  },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontSize: 13, color: colors.gray800 },
  tabTextActive: { color: colors.background, fontWeight: '700' },
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
