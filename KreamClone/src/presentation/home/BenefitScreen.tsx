import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

const BENEFITS = [
  { id: '1', title: '첫 거래 쿠폰', desc: '첫 거래 완료 시 5,000원 쿠폰 즉시 지급', icon: '🎁' },
  { id: '2', title: '포인트 적립', desc: '모든 거래 금액의 1% 포인트 적립', icon: '💰' },
  { id: '3', title: '정품 보증', desc: 'KREAM 검수 센터의 100% 정품 보증', icon: '✅' },
  { id: '4', title: '안전 결제', desc: '에스크로 방식의 안전한 거래 보호', icon: '🔒' },
];

type Props = HomeStackScreenProps<'Benefit'>;

export default function BenefitScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="혜택" onBack={() => navigation.goBack()} />
      <FlatList
        data={BENEFITS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: colors.gray100, borderRadius: 12 },
  icon: { fontSize: 32 },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  desc: { fontSize: 13, color: colors.gray500, lineHeight: 18 },
  sep: { height: 8 },
});
