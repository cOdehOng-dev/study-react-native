import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useBuyViewModel } from './mvi/useBuyViewModel';
import { ALL_PRODUCTS } from '../../../data/mock/productsMock';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'BuyConfirm'>;

export default function BuyConfirmScreen({ navigation, route }: Props) {
  const { productId, size, price, isBid } = route.params;
  const { state, placeBid } = useBuyViewModel(productId);
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];
  const orderIdRef = useRef(`order-${Date.now()}`);

  const handleConfirm = async () => {
    await placeBid();
  };

  useEffect(() => {
    if (state.isSuccess) {
      navigation.replace('BuyComplete', { productId, orderId: orderIdRef.current });
    }
  }, [state.isSuccess, navigation, productId]);

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  return (
    <SafeAreaWrapper>
      <Header title={isBid ? '구매 입찰 확인' : '즉시구매 확인'} onBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주문 정보</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>상품</Text>
            <Text style={styles.rowValue} numberOfLines={2}>{product.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>사이즈</Text>
            <Text style={styles.rowValue}>{size}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>거래 방식</Text>
            <Text style={styles.rowValue}>{isBid ? '구매 입찰' : '즉시구매'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 금액</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>구매가</Text>
            <Text style={styles.priceValue}>{price.toLocaleString()}원</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>수수료</Text>
            <Text style={styles.rowValue}>무료</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>최종 결제금액</Text>
            <Text style={styles.totalValue}>{price.toLocaleString()}원</Text>
          </View>
        </View>

        {state.error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={isBid ? '입찰하기' : '즉시구매'}
          onPress={handleConfirm}
          style={styles.btn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  section: { padding: 16, borderBottomWidth: 8, borderColor: colors.gray100 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: colors.primary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { fontSize: 14, color: colors.gray500 },
  rowValue: { fontSize: 14, color: colors.primary, flex: 1, textAlign: 'right' },
  priceValue: { fontSize: 14, fontWeight: '700', color: colors.primary },
  totalRow: { borderTopWidth: 1, borderColor: colors.gray200, marginTop: 8, paddingTop: 16 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: colors.primary },
  totalValue: { fontSize: 18, fontWeight: '900', color: colors.accent },
  errorBox: { margin: 16, padding: 12, backgroundColor: '#FFF0EE', borderRadius: 8 },
  errorText: { fontSize: 13, color: colors.accent },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  btn: { width: '100%' },
});
