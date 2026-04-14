import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {useOrder} from '../../context/OrderContext';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<OrderStackParamList, 'OrderSummary'>;

const OrderSummaryScreen: React.FC<Props> = ({navigation}) => {
  const {currentOrder, submitOrder, resetOrder} = useOrder();

  const handleSubmit = () => {
    submitOrder();
    Alert.alert('주문 완료', '세탁 신청이 완료되었습니다!', [
      {text: '확인', onPress: () => navigation.popToTop()},
    ]);
  };

  const handleCancel = () => {
    resetOrder();
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Header title="주문 확인" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>서비스</Text>
          <Text style={styles.cardValue}>{currentOrder.service?.name ?? '-'}</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>수거 일정</Text>
          <Text style={styles.cardValue}>
            {currentOrder.scheduledDate} {currentOrder.scheduledTime}
          </Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>주소</Text>
          <Text style={styles.cardValue}>{currentOrder.address ?? '-'}</Text>
        </Card>
        <Card style={[styles.card, styles.totalCard]}>
          <Text style={styles.cardTitle}>예상 금액</Text>
          <Text style={styles.totalValue}>
            {(currentOrder.items?.reduce((s, i) => s + i.price, 0) ?? 0).toLocaleString()}원
          </Text>
        </Card>
        <Text style={styles.notice}>
          * 실제 금액은 수거 후 확정됩니다
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="신청 취소" variant="outline" onPress={handleCancel} />
        <Button title="신청 완료" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.md, gap: spacing.sm},
  card: {gap: spacing.xs},
  cardTitle: {fontSize: fontSize.sm, color: colors.textSecondary},
  cardValue: {fontSize: fontSize.md, fontWeight: '600', color: colors.text},
  totalCard: {borderWidth: 1.5, borderColor: colors.primary},
  totalValue: {fontSize: fontSize.xl, fontWeight: '800', color: colors.primary},
  notice: {fontSize: fontSize.xs, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm},
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default OrderSummaryScreen;
