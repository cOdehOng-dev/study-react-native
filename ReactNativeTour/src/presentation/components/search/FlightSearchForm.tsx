// src/presentation/components/search/FlightSearchForm.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlightSearchForm as FlightSearchFormType } from '../../../domain/model/SearchQuery';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface Props {
  form: FlightSearchFormType;
  onSwap: () => void;
}

export function FlightSearchForm({ form, onSwap }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.routeRow}>
        <View style={styles.cityBox}>
          <Text style={styles.cityIcon}>📍</Text>
          <Text style={styles.cityText}>{form.departure}</Text>
        </View>
        <TouchableOpacity style={styles.swapBtn} onPress={onSwap} activeOpacity={0.7}>
          <Text style={styles.swapIcon}>⇄</Text>
        </TouchableOpacity>
        <View style={styles.cityBox}>
          <Text style={styles.cityIcon}>📌</Text>
          <Text style={styles.cityText}>{form.arrival}</Text>
        </View>
      </View>
      <View style={styles.dateRow}>
        <Text style={styles.dateIcon}>📅</Text>
        <Text style={styles.dateText}>
          {form.departureDate} ~ {form.returnDate}
        </Text>
        <Text style={styles.passengerText}>성인 {form.adults}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgInput,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 17,
    gap: 6,
  },
  cityIcon: { fontSize: 16, opacity: 0.3 },
  cityText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  swapBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    marginLeft: -14,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  swapIcon: { fontSize: 14 },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgInput,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 17,
    gap: 6,
    justifyContent: 'space-between',
  },
  dateIcon: { fontSize: 16, opacity: 0.3 },
  dateText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
  passengerText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
});
