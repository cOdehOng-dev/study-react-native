import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'BuyBid'>;

export default function BuyBidScreen({ navigation, route }: Props) {
  const { productId, size, buyPrice } = route.params;
  const [bidPrice, setBidPrice] = useState(String(buyPrice));

  const parsedPrice = parseInt(bidPrice.replace(/,/g, ''), 10) || 0;

  return (
    <SafeAreaWrapper>
      <Header title="구매 입찰" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.label}>사이즈</Text>
          <Text style={styles.value}>{size}</Text>

          <Text style={styles.label}>즉시구매가</Text>
          <Text style={styles.value}>{buyPrice.toLocaleString()}원</Text>

          <Text style={styles.label}>입찰가 입력</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={bidPrice}
              onChangeText={setBidPrice}
              keyboardType="numeric"
              placeholder="희망 구매가를 입력하세요"
              placeholderTextColor={colors.gray500}
            />
            <Text style={styles.unit}>원</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>입찰가가 즉시구매가보다 낮을 경우 입찰로 등록됩니다.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label={parsedPrice > 0 ? `${parsedPrice.toLocaleString()}원으로 입찰` : '입찰가를 입력하세요'}
            onPress={() => {
              if (parsedPrice <= 0) { return; }
              navigation.navigate('BuyConfirm', {
                productId,
                size,
                price: parsedPrice,
                isBid: true,
              });
            }}
            style={styles.btn}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flex: 1, padding: 20 },
  label: { fontSize: 12, color: colors.gray500, marginTop: 16, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '700', color: colors.primary },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: colors.primary, paddingBottom: 4 },
  input: { flex: 1, fontSize: 22, fontWeight: '800', color: colors.primary },
  unit: { fontSize: 16, color: colors.primary, marginLeft: 4 },
  infoBox: { marginTop: 12, padding: 12, backgroundColor: colors.gray100, borderRadius: 8 },
  infoText: { fontSize: 12, color: colors.gray500, lineHeight: 18 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  btn: { width: '100%' },
});
