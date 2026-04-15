import React from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, RefreshControl,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { BannerCarousel } from './components/BannerCarousel';
import { CategoryTabs } from './components/CategoryTabs';
import { ProductSection } from './components/ProductSection';
import { SectionHeader } from './components/SectionHeader';
import { useHomeViewModel } from './mvi/useHomeViewModel';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';
import { BannerModel } from '../../domain/model/BannerModel';
import { ProductModel } from '../../domain/model/ProductModel';

type Props = HomeStackScreenProps<'HomeMain'>;

export default function HomeScreen({ navigation }: Props) {
  const { state, selectCategory, refresh } = useHomeViewModel();

  const handleBannerPress = (banner: BannerModel) => {
    navigation.navigate('BannerDetail', { bannerId: banner.id });
  };

  const handleProductPress = (product: ProductModel) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  if (state.isLoading && state.trendingProducts.length === 0) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  if (state.error && state.trendingProducts.length === 0) {
    return (
      <SafeAreaWrapper>
        <EmptyState message="데이터를 불러올 수 없습니다." subMessage={state.error} />
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>KREAM</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Notification')}>
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={state.isLoading} onRefresh={refresh} />
        }>

        {/* 배너 캐러셀 */}
        {state.banners.length > 0 && (
          <BannerCarousel banners={state.banners} onPress={handleBannerPress} />
        )}

        {/* 카테고리 탭 */}
        <CategoryTabs
          categories={state.categories}
          selected={state.selectedCategory}
          onSelect={selectCategory}
        />

        {/* 빠른 메뉴 */}
        <View style={styles.quickMenu}>
          {(
            [
              { label: '랭킹', icon: '🏆', route: 'Ranking' },
              { label: '신규입고', icon: '✨', route: 'NewArrival' },
              { label: '브랜드', icon: '🏷️', route: 'BrandList' },
              { label: '컬렉션', icon: '📦', route: 'Collection' },
              { label: '이벤트', icon: '🎉', route: 'Event' },
            ] as { label: string; icon: string; route: 'Ranking' | 'NewArrival' | 'BrandList' | 'Collection' | 'Event' }[]
          ).map(({ label, icon, route }) => (
            <TouchableOpacity
              key={label}
              style={styles.quickItem}
              onPress={() => navigation.navigate(route)}>
              <View style={styles.quickIcon}>
                <Text style={styles.quickEmoji}>{icon}</Text>
              </View>
              <Text style={styles.quickLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 인기 상품 */}
        <SectionHeader
          title="지금 인기 상품"
          onMore={() => navigation.navigate('Ranking')}
        />
        <ProductSection
          products={state.trendingProducts}
          onPress={handleProductPress}
        />

        {/* 랭킹 */}
        <SectionHeader
          title="실시간 랭킹"
          onMore={() => navigation.navigate('Ranking')}
        />
        <ProductSection
          products={state.rankingProducts}
          onPress={handleProductPress}
        />

        {/* 신규 입고 */}
        <SectionHeader
          title="신규 입고"
          onMore={() => navigation.navigate('NewArrival')}
        />
        <ProductSection
          products={state.newArrivals}
          onPress={handleProductPress}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray200,
  },
  logo: { fontSize: 20, fontWeight: '900', letterSpacing: 3, color: colors.primary },
  headerRight: { flexDirection: 'row', gap: 8 },
  headerBtn: { padding: 4 },
  headerIcon: { fontSize: 20 },
  quickMenu: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingVertical: 16, paddingHorizontal: 8,
    borderBottomWidth: 1, borderBottomColor: colors.gray100,
  },
  quickItem: { alignItems: 'center', gap: 6 },
  quickIcon: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: colors.gray100,
    justifyContent: 'center', alignItems: 'center',
  },
  quickEmoji: { fontSize: 22 },
  quickLabel: { fontSize: 11, color: colors.gray800 },
  bottomPadding: { height: 32 },
});
