import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import { ShopStackScreenProps } from '../navigation/types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { ProductCard } from '../components/ProductCard';
import { useShopViewModel } from './mvi/useShopViewModel';
import { colors } from '../theme/colors';

type Props = ShopStackScreenProps<'ShopMain'>;

const CATEGORIES = ['전체', '스니커즈', '어패럴', '아우터', '탑', '팬츠', '가방', '모자'];
const SORTS: Array<{ label: string; value: 'default' | 'price_asc' | 'price_desc' | 'popular' }> = [
  { label: '추천순', value: 'default' },
  { label: '가격낮은순', value: 'price_asc' },
  { label: '가격높은순', value: 'price_desc' },
  { label: '인기순', value: 'popular' },
];

export default function ShopScreen({ navigation }: Props) {
  const { state, displayProducts, selectCategory, setSort } = useShopViewModel();

  if (state.isLoading && state.products.length === 0) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>SHOP</Text>
      </View>

      <FlatList
        data={displayProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {/* 카테고리 탭 */}
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.catList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.catTab, state.selectedCategory === item && styles.catTabActive]}
                  onPress={() => selectCategory(item)}>
                  <Text style={[styles.catText, state.selectedCategory === item && styles.catTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {/* 정렬 탭 */}
            <View style={styles.sortRow}>
              {SORTS.map(({ label, value }) => (
                <TouchableOpacity key={value} onPress={() => setSort(value)}>
                  <Text style={[styles.sortOpt, state.sort === value && styles.sortOptActive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.countText}>{displayProducts.length}개</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              brand={item.brand}
              name={item.name}
              price={item.buyPrice}
              imageUri={item.imageUri}
              onPress={() => navigation.navigate('ShopProductDetail', { productId: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState message="상품이 없습니다." subMessage="다른 카테고리를 선택해보세요." />
        }
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48, justifyContent: 'center', paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray200,
  },
  logo: { fontSize: 16, fontWeight: '900', letterSpacing: 2, color: colors.primary },
  catList: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  catTab: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: colors.gray200,
  },
  catTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  catText: { fontSize: 13, color: colors.gray800 },
  catTextActive: { color: colors.background, fontWeight: '700' },
  sortRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: colors.gray100,
  },
  sortOpt: { fontSize: 12, color: colors.gray500 },
  sortOptActive: { color: colors.primary, fontWeight: '700' },
  countText: { marginLeft: 'auto', fontSize: 12, color: colors.gray500 },
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
