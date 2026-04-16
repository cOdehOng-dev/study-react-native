// src/presentation/components/search/SearchModule.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchTab } from '../../../domain/model/SearchQuery';
import { SearchState } from '../../mvi/search/SearchState';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { FlightSearchForm } from './FlightSearchForm';
import { HotelSearchForm } from './HotelSearchForm';
import { TourSearchForm } from './TourSearchForm';
import { PackageSearchForm } from './PackageSearchForm';

const TABS: SearchTab[] = ['항공', '숙소', '투어·티켓', '해외패키지'];

interface Props {
  state: SearchState;
  onSelectTab: (tab: SearchTab) => void;
  onSwapCities: () => void;
}

export function SearchModule({ state, onSelectTab, onSwapCities }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.tabRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, state.activeTab === tab && styles.tabActive]}
              onPress={() => onSelectTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  state.activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.formArea}>
          {state.activeTab === '항공' && (
            <FlightSearchForm form={state.flight} onSwap={onSwapCities} />
          )}
          {state.activeTab === '숙소' && <HotelSearchForm form={state.hotel} />}
          {state.activeTab === '투어·티켓' && <TourSearchForm form={state.tour} />}
          {state.activeTab === '해외패키지' && <PackageSearchForm form={state.package} />}
        </View>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
          <Text style={styles.searchBtnText}>최저가 검색</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 4,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  tabActive: {
    backgroundColor: colors.bgShortcutActive,
  },
  tabText: {
    fontFamily: typography.bold,
    fontSize: 13,
    color: colors.textDisabled,
    lineHeight: 16,
  },
  tabTextActive: {
    color: colors.primary,
  },
  formArea: {
    gap: 8,
  },
  searchBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.white,
    lineHeight: 19,
  },
});
