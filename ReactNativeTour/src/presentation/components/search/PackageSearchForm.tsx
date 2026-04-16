// src/presentation/components/search/PackageSearchForm.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PackageSearchForm as PackageSearchFormType } from '../../../domain/model/SearchQuery';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  form: PackageSearchFormType;
}

export function PackageSearchForm({ form }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.icon}>🌍</Text>
        <Text style={styles.text}>{form.destination || '여행지를 선택해주세요'}</Text>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.text}>
          {form.departureDate} ~ {form.returnDate}
        </Text>
        <Text style={styles.subText}>성인 {form.adults}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgInput,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 17,
    gap: 6,
  },
  icon: { fontSize: 16, opacity: 0.3 },
  text: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
  subText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
});
