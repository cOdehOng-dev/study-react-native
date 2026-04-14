import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import {useOrder} from '../../context/OrderContext';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<OrderStackParamList, 'Address'>;

const savedAddresses = [
  '서울시 강남구 테헤란로 123',
  '서울시 마포구 홍익로 45',
];

const AddressScreen: React.FC<Props> = ({navigation}) => {
  const {setAddress} = useOrder();
  const [selected, setSelected] = useState('');
  const [custom, setCustom] = useState('');

  const finalAddress = selected || custom;

  const handleNext = () => {
    setAddress(finalAddress);
    navigation.navigate('OrderSummary');
  };

  return (
    <View style={styles.container}>
      <Header title="주소 선택" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>저장된 주소</Text>
        {savedAddresses.map(addr => (
          <TouchableOpacity
            key={addr}
            style={[styles.addressCard, selected === addr && styles.addressCardSelected]}
            onPress={() => {setSelected(addr); setCustom('');}}>
            <Text style={styles.addressText}>📍 {addr}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.label, styles.labelMargin]}>직접 입력</Text>
        <TextInput
          style={styles.input}
          placeholder="새 주소 입력"
          value={custom}
          onChangeText={v => {setCustom(v); setSelected('');}}
          placeholderTextColor={colors.textSecondary}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button title="다음" onPress={handleNext} disabled={!finalAddress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.lg, gap: spacing.sm},
  label: {fontSize: fontSize.md, fontWeight: '700', color: colors.text, marginBottom: spacing.xs},
  labelMargin: {marginTop: spacing.lg},
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  addressCardSelected: {borderColor: colors.primary, backgroundColor: '#EFF6FF'},
  addressText: {fontSize: fontSize.md, color: colors.text},
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  footer: {padding: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border},
});

export default AddressScreen;
