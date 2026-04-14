import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import {useOrder} from '../../context/OrderContext';
import {colors, spacing, fontSize, radius} from '../../constants/theme';
import {OrderItem} from '../../types/models';

type Props = NativeStackScreenProps<OrderStackParamList, 'Quantity'>;

const ITEMS = ['셔츠', '바지', '원피스', '자켓', '코트', '티셔츠'];

const QuantityScreen: React.FC<Props> = ({navigation}) => {
  const {currentOrder, setItems} = useOrder();
  const pricePerItem = currentOrder.service?.pricePerItem ?? 0;
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const adjust = (name: string, delta: number) =>
    setQuantities(prev => ({
      ...prev,
      [name]: Math.max(0, (prev[name] ?? 0) + delta),
    }));

  const items: OrderItem[] = ITEMS.filter(n => quantities[n] > 0).map(n => ({
    serviceId: currentOrder.service?.id ?? '',
    name: n,
    quantity: quantities[n],
    price: quantities[n] * pricePerItem,
  }));

  const total = items.reduce((s, i) => s + i.price, 0);

  const handleNext = () => {
    setItems(items);
    navigation.navigate('Schedule');
  };

  return (
    <View style={styles.container}>
      <Header title="수량 선택" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {ITEMS.map(name => (
          <View key={name} style={styles.row}>
            <Text style={styles.itemName}>{name}</Text>
            <View style={styles.counter}>
              <TouchableOpacity style={styles.btn} onPress={() => adjust(name, -1)}>
                <Text style={styles.btnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantities[name] ?? 0}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => adjust(name, 1)}>
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>
              {((quantities[name] ?? 0) * pricePerItem).toLocaleString()}원
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>합계: {total.toLocaleString()}원</Text>
        <Button title="다음" onPress={handleNext} disabled={items.length === 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.md, gap: spacing.sm},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  itemName: {flex: 1, fontSize: fontSize.md, color: colors.text},
  counter: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {fontSize: fontSize.lg, color: colors.text},
  quantity: {fontSize: fontSize.lg, fontWeight: '700', color: colors.text, minWidth: 24, textAlign: 'center'},
  price: {width: 70, textAlign: 'right', fontSize: fontSize.sm, color: colors.primary, fontWeight: '600'},
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  total: {fontSize: fontSize.lg, fontWeight: '700', color: colors.text},
});

export default QuantityScreen;
