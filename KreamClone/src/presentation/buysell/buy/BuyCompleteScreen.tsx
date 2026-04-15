import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'BuyComplete'>;

export default function BuyCompleteScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.icon}>🎉</Text>
        <Text style={styles.title}>구매가 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          KREAM 검수 후 배송이 시작됩니다.{'\n'}마이페이지에서 거래 현황을 확인하세요.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>검수 안내</Text>
          <Text style={styles.infoText}>• 판매자 배송 → KREAM 검수 → 구매자 배송</Text>
          <Text style={styles.infoText}>• 검수 기간: 영업일 기준 1~3일</Text>
          <Text style={styles.infoText}>• 불합격 시 전액 환불</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="홈으로 돌아가기"
          onPress={() => navigation.navigate('HomeMain')}
          style={styles.homeBtn}
        />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '900', color: colors.primary, marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.gray500, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  infoBox: { width: '100%', backgroundColor: colors.gray100, padding: 16, borderRadius: 12, gap: 8 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  infoText: { fontSize: 13, color: colors.gray500, lineHeight: 20 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: colors.gray200 },
  homeBtn: { width: '100%' },
});
