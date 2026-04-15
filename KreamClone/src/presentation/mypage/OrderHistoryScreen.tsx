import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { EmptyState } from '../components/EmptyState';
import { MOCK_ORDERS } from '../../data/mock/ordersMock';
import { OrderModel } from '../../domain/model/OrderModel';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'OrderHistory'>;

const TABS = ['전체', '구매', '판매'] as const;
type Tab = typeof TABS[number];

const STATUS_COLOR: Record<string, string> = {
  '입찰중': '#FF9500',
  '거래중': colors.primary,
  '완료': '#8E8E93',
  '취소': '#EF6253',
};

export default function OrderHistoryScreen({ navigation }: Props) {
  const [tab, setTab] = useState<Tab>('전체');
  const filtered = tab === '전체' ? MOCK_ORDERS : MOCK_ORDERS.filter((o) => o.type === tab);

  const renderItem = ({ item }: { item: OrderModel }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[styles.status, { color: STATUS_COLOR[item.status] ?? colors.primary }]}>
          {item.status}
        </Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
      <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.size}>사이즈: {item.size}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
      </View>
      <Text style={styles.date}>{item.createdAt.slice(0, 10)}</Text>
    </View>
  );

  return (
    <SafeAreaWrapper>
      <Header title="구매/판매 내역" onBack={() => navigation.goBack()} />
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filtered.length === 0 ? (
        <EmptyState message="내역이 없습니다." subMessage="구매 또는 판매를 시작해보세요." />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.gray200 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderColor: colors.primary },
  tabText: { fontSize: 14, color: colors.gray500 },
  tabTextActive: { color: colors.primary, fontWeight: '700' },
  list: { padding: 16, gap: 12 },
  card: {
    padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.background,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  status: { fontSize: 13, fontWeight: '700' },
  type: {
    fontSize: 12, color: colors.gray500,
    backgroundColor: colors.gray100,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4,
  },
  productName: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  size: { fontSize: 13, color: colors.gray500 },
  price: { fontSize: 15, fontWeight: '900', color: colors.primary },
  date: { fontSize: 11, color: colors.gray500, marginTop: 4 },
});
