import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useBuyViewModel } from './mvi/useBuyViewModel';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'Buy'>;

export default function BuyScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const { state, selectSize } = useBuyViewModel(productId);
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title="구매" onBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
        </View>

        <Text style={styles.sectionTitle}>사이즈 선택</Text>
        <FlatList
          data={state.sizes}
          keyExtractor={(item) => item.size}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.sizeGrid}
          renderItem={({ item }) => {
            const isSelected = state.selectedSize?.size === item.size;
            return (
              <TouchableOpacity
                style={[styles.sizeCard, isSelected && styles.sizeCardActive]}
                onPress={() => selectSize(item)}>
                <Text style={[styles.sizeText, isSelected && styles.sizeTextActive]}>
                  {item.size}
                </Text>
                <Text style={[styles.sizePrice, isSelected && styles.sizePriceActive]}>
                  {item.buyPrice.toLocaleString()}원
                </Text>
                <Text style={[styles.sizeBidCount, isSelected && styles.sizePriceActive]}>
                  구매 {item.buyBidCount}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={
            state.selectedSize
              ? `즉시구매  ${state.selectedSize.buyPrice.toLocaleString()}원`
              : '사이즈를 선택하세요'
          }
          onPress={() => {
            if (!state.selectedSize) { return; }
            navigation.navigate('BuyConfirm', {
              productId,
              size: state.selectedSize.size,
              price: state.selectedSize.buyPrice,
              isBid: false,
            });
          }}
          style={styles.buyBtn}
        />
        <Button
          label="구매 입찰"
          onPress={() => {
            if (!state.selectedSize) { return; }
            navigation.navigate('BuyBid', {
              productId,
              size: state.selectedSize.size,
              buyPrice: state.selectedSize.buyPrice,
            });
          }}
          variant="secondary"
          style={styles.bidBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  productInfo: { padding: 16, borderBottomWidth: 1, borderColor: colors.gray100 },
  brand: { fontSize: 13, color: colors.gray500, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '800', color: colors.primary },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, padding: 16, paddingBottom: 8 },
  sizeGrid: { paddingHorizontal: 12, paddingBottom: 16 },
  sizeCard: {
    flex: 1, margin: 4, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.background, alignItems: 'center',
  },
  sizeCardActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  sizeText: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  sizeTextActive: { color: colors.background },
  sizePrice: { fontSize: 13, color: colors.gray800, marginBottom: 2 },
  sizePriceActive: { color: colors.background },
  sizeBidCount: { fontSize: 11, color: colors.gray500 },
  footer: {
    flexDirection: 'row', padding: 12, gap: 8,
    borderTopWidth: 1, borderColor: colors.gray200,
  },
  buyBtn: { flex: 2 },
  bidBtn: { flex: 1 },
});
