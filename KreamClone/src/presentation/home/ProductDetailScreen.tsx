import React from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { PriceTag } from '../components/PriceTag';
import { Button } from '../components/Button';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'ProductDetail'>;

export default function ProductDetailScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  return (
    <SafeAreaWrapper>
      <Header title="" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상품 이미지 */}
        <View style={styles.imageBox}>
          <Image source={{ uri: product.imageUri }} style={styles.image} />
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* 브랜드 & 상품명 */}
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* 찜 */}
          <TouchableOpacity style={styles.wishRow}>
            <Text style={styles.wishIcon}>🤍</Text>
            <Text style={styles.wishCount}>{product.wishCount.toLocaleString()}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* 즉시 가격 */}
          <View style={styles.priceRow}>
            <PriceTag type="즉시구매가" price={product.buyPrice} />
            <View style={styles.priceDivider} />
            <PriceTag type="즉시판매가" price={product.sellPrice} />
          </View>

          <View style={styles.divider} />

          {/* 상품 정보 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>카테고리</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>발매가</Text>
            <Text style={styles.infoValue}>-</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>색상</Text>
            <Text style={styles.infoValue}>-</Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 구매/판매 버튼 */}
      <View style={styles.footer}>
        <Button
          label={`구매  ${product.buyPrice.toLocaleString()}원`}
          onPress={() => navigation.navigate('Buy', { productId: product.id })}
          style={styles.buyBtn}
        />
        <Button
          label={`판매  ${product.sellPrice.toLocaleString()}원`}
          onPress={() => navigation.navigate('Sell', { productId: product.id })}
          variant="secondary"
          style={styles.sellBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  imageBox: { width: '100%', height: 300, backgroundColor: colors.gray100, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  newBadge: {
    position: 'absolute', top: 12, left: 12,
    backgroundColor: colors.accent, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4,
  },
  newBadgeText: { color: colors.background, fontSize: 11, fontWeight: '700' },
  content: { padding: 16 },
  brand: { fontSize: 13, color: colors.gray500, marginBottom: 4 },
  name: { fontSize: 18, fontWeight: '800', color: colors.primary, marginBottom: 8 },
  wishRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 16 },
  wishIcon: { fontSize: 18 },
  wishCount: { fontSize: 13, color: colors.gray500 },
  divider: { height: 1, backgroundColor: colors.gray100, marginVertical: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  priceDivider: { width: 1, height: 40, backgroundColor: colors.gray100 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: colors.gray100 },
  infoLabel: { fontSize: 14, color: colors.gray500 },
  infoValue: { fontSize: 14, color: colors.primary },
  footer: {
    flexDirection: 'row', padding: 12, gap: 8,
    borderTopWidth: 1, borderTopColor: colors.gray200,
    backgroundColor: colors.background,
  },
  buyBtn: { flex: 1 },
  sellBtn: { flex: 1 },
});
