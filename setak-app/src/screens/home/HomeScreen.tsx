import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useOrder} from '../../context/OrderContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import {mockServices} from '../../data/mockServices';
import {colors, spacing, fontSize, radius} from '../../constants/theme';
import {Service} from '../../types/models';

const HomeScreen = () => {
  const {user} = useAuth();
  const {orderHistory} = useOrder();
  const recentOrder = orderHistory[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>안녕하세요,</Text>
          <Text style={styles.name}>{user?.name ?? '고객'}님 👋</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsLabel}>포인트</Text>
          <Text style={styles.pointsValue}>{user?.points?.toLocaleString() ?? 0}P</Text>
        </View>
      </View>

      {/* 배너 */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>신규 가입 혜택</Text>
        <Text style={styles.bannerDesc}>첫 주문 20% 할인 쿠폰 증정!</Text>
      </View>

      {/* 서비스 */}
      <Text style={styles.sectionTitle}>서비스 선택</Text>
      <FlatList
        data={mockServices}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.serviceList}
        renderItem={({item}: {item: Service}) => (
          <TouchableOpacity style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>{item.icon}</Text>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.pricePerItem.toLocaleString()}원~</Text>
          </TouchableOpacity>
        )}
      />

      {/* 최근 주문 */}
      {recentOrder && (
        <>
          <Text style={styles.sectionTitle}>최근 주문</Text>
          <Card style={styles.recentOrder}>
            <View style={styles.recentOrderRow}>
              <Text style={styles.recentOrderName}>{recentOrder.service.name}</Text>
              <Badge status={recentOrder.status} />
            </View>
            <Text style={styles.recentOrderDate}>수거 예정: {recentOrder.scheduledDate} {recentOrder.scheduledTime}</Text>
            <Text style={styles.recentOrderPrice}>{recentOrder.totalPrice.toLocaleString()}원</Text>
          </Card>
        </>
      )}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
  },
  greeting: {fontSize: fontSize.md, color: colors.surfaceSubtle},
  name: {fontSize: fontSize.xl, fontWeight: '800', color: colors.surface},
  pointsBadge: {
    backgroundColor: colors.surfaceSubtleLight,
    borderRadius: radius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  pointsLabel: {fontSize: fontSize.xs, color: colors.surfaceSubtle},
  pointsValue: {fontSize: fontSize.md, fontWeight: '700', color: colors.surface},
  banner: {
    margin: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  bannerText: {fontSize: fontSize.sm, fontWeight: '700', color: colors.surface},
  bannerDesc: {fontSize: fontSize.xs, color: colors.surfaceSubtle, marginTop: 2},
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  serviceList: {paddingHorizontal: spacing.md, gap: spacing.sm},
  serviceCard: {
    width: 90,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  serviceIcon: {fontSize: 32, marginBottom: spacing.xs},
  serviceName: {fontSize: fontSize.xs, fontWeight: '600', color: colors.text, textAlign: 'center'},
  servicePrice: {fontSize: fontSize.xs, color: colors.primary, marginTop: 2},
  recentOrder: {marginHorizontal: spacing.md, marginTop: spacing.xs},
  recentOrderRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs},
  recentOrderName: {fontSize: fontSize.md, fontWeight: '700', color: colors.text},
  recentOrderDate: {fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xs},
  recentOrderPrice: {fontSize: fontSize.md, fontWeight: '700', color: colors.primary},
  bottomSpacer: {height: spacing.xl},
});

export default HomeScreen;
