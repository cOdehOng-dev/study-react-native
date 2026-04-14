import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HistoryStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import {useOrder} from '../../context/OrderContext';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<HistoryStackParamList, 'HistoryDetail'>;

const HistoryDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {orderId} = route.params;
  const {orderHistory} = useOrder();
  const order = orderHistory.find(o => o.id === orderId);

  if (!order) {
    return (
      <View style={styles.container}>
        <Header title="주문 상세" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text style={styles.notFound}>주문을 찾을 수 없습니다.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="주문 상세" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>서비스 정보</Text>
          <Text style={styles.serviceName}>{order.service.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{order.status}</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>수거 일정</Text>
          <Text style={styles.infoText}>
            {order.scheduledDate} {order.scheduledTime}
          </Text>
          <Text style={styles.infoText}>{order.address}</Text>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>주문 품목</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}개</Text>
              <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>합계</Text>
            <Text style={styles.totalPrice}>{order.totalPrice.toLocaleString()}원</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  scroll: {padding: spacing.md, gap: spacing.sm},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  notFound: {fontSize: fontSize.md, color: colors.textSecondary},
  section: {marginBottom: spacing.xs},
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  serviceName: {fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.xs},
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {fontSize: fontSize.xs, color: colors.surface, fontWeight: '600'},
  infoText: {fontSize: fontSize.md, color: colors.text, marginBottom: spacing.xs},
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  itemName: {flex: 1, fontSize: fontSize.md, color: colors.text},
  itemQuantity: {fontSize: fontSize.md, color: colors.textSecondary},
  itemPrice: {fontSize: fontSize.md, color: colors.text, fontWeight: '600'},
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  totalLabel: {fontSize: fontSize.md, fontWeight: '700', color: colors.text},
  totalPrice: {fontSize: fontSize.md, fontWeight: '700', color: colors.primary},
});

export default HistoryDetailScreen;
