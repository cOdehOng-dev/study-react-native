import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HistoryStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import {useOrder} from '../../context/OrderContext';
import {Order} from '../../types/models';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<HistoryStackParamList, 'HistoryList'>;

const HistoryListScreen: React.FC<Props> = ({navigation}) => {
  const {orderHistory} = useOrder();

  const handlePress = (order: Order) => {
    navigation.navigate('HistoryDetail', {orderId: order.id});
  };

  return (
    <View style={styles.container}>
      <Header title="주문 내역" />
      <FlatList
        data={orderHistory}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity testID={`history-item-${item.id}`} style={styles.item} onPress={() => handlePress(item)}>
            <View style={styles.row}>
              <Text style={styles.serviceName}>{item.service.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.date}>{item.scheduledDate}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  list: {padding: spacing.md, gap: spacing.sm},
  item: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  serviceName: {fontSize: fontSize.md, fontWeight: '700', color: colors.text},
  badge: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {fontSize: fontSize.xs, color: colors.surface, fontWeight: '600'},
  date: {fontSize: fontSize.sm, color: colors.textSecondary},
});

export default HistoryListScreen;
