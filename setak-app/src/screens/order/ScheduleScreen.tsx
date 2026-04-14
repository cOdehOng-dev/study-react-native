import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../../types/navigation';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import {useOrder} from '../../context/OrderContext';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<OrderStackParamList, 'Schedule'>;

const dates = Array.from({length: 7}, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return d.toISOString().split('T')[0];
});

const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const ScheduleScreen: React.FC<Props> = ({navigation}) => {
  const {setSchedule} = useOrder();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleNext = () => {
    setSchedule(selectedDate, selectedTime);
    navigation.navigate('Address');
  };

  return (
    <View style={styles.container}>
      <Header title="수거 일정" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>날짜 선택</Text>
        <View style={styles.grid}>
          {dates.map(d => (
            <TouchableOpacity
              key={d}
              style={[styles.chip, selectedDate === d && styles.chipActive]}
              onPress={() => setSelectedDate(d)}>
              <Text style={[styles.chipText, selectedDate === d && styles.chipTextActive]}>
                {d.slice(5)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>시간 선택</Text>
        <View style={styles.grid}>
          {times.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, selectedTime === t && styles.chipActive]}
              onPress={() => setSelectedTime(t)}>
              <Text style={[styles.chipText, selectedTime === t && styles.chipTextActive]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="다음"
          onPress={handleNext}
          disabled={!selectedDate || !selectedTime}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.lg, gap: spacing.md},
  label: {fontSize: fontSize.md, fontWeight: '700', color: colors.text, marginBottom: spacing.xs},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm},
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {borderColor: colors.primary, backgroundColor: '#EFF6FF'},
  chipText: {fontSize: fontSize.sm, color: colors.textSecondary},
  chipTextActive: {color: colors.primary, fontWeight: '700'},
  footer: {padding: spacing.lg, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border},
});

export default ScheduleScreen;
