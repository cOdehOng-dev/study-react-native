import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { HomeStackScreenProps } from '../../navigation/types';

type Props = HomeStackScreenProps<'SellComplete'>;

export default function SellCompleteScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>판매 등록이 완료되었습니다!</Text>
        <Text style={styles.subtitle}>
          구매자가 나타나면 알림을 드립니다.{'\n'}마이페이지에서 판매 현황을 확인하세요.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>판매 안내</Text>
          <Text style={styles.infoText}>• 구매 체결 후 2일 이내 KREAM으로 발송</Text>
          <Text style={styles.infoText}>• 검수 완료 후 정산 (영업일 1~3일)</Text>
          <Text style={styles.infoText}>• 입찰 유효기간: 30일</Text>
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
