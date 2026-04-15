import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useMyPageViewModel } from './mvi/useMyPageViewModel';
import { MOCK_ORDERS } from '../../data/mock/ordersMock';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'MyPageMain'>;

export default function MyPageScreen({ navigation }: Props) {
  const { state } = useMyPageViewModel();

  if (state.isLoading) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  const ongoing = MOCK_ORDERS.filter((o) => o.status === '입찰중' || o.status === '거래중').length;

  const MENU_ITEMS = [
    { label: '구매/판매 내역', route: 'OrderHistory' as const, icon: '📋' },
    { label: '관심 상품', route: 'Wishlist' as const, icon: '♥' },
    { label: '내 스타일', route: 'MyStyles' as const, icon: '👗' },
    { label: '계정 설정', route: 'AccountSettings' as const, icon: '⚙️' },
  ] as const;

  return (
    <SafeAreaWrapper>
      <View style={styles.header}>
        <Text style={styles.logo}>MY</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {state.user?.name?.charAt(0) ?? 'K'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{state.user?.name ?? '유저'}</Text>
            <Text style={styles.userEmail}>{state.user?.email ?? ''}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{ongoing}</Text>
            <Text style={styles.statLabel}>진행 중</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{state.wishlist.length}</Text>
            <Text style={styles.statLabel}>관심</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{state.orders.length}</Text>
            <Text style={styles.statLabel}>거래 내역</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {MENU_ITEMS.map(({ label, route, icon }) => (
            <TouchableOpacity
              key={route}
              style={styles.menuRow}
              onPress={() => navigation.navigate(route)}>
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={styles.menuLabel}>{label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray200,
  },
  logo: { fontSize: 16, fontWeight: '900', color: colors.primary },
  settingsIcon: { fontSize: 20 },
  profileSection: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 20, borderBottomWidth: 1, borderColor: colors.gray100,
  },
  avatarPlaceholder: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: colors.gray200, alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: { fontSize: 24, fontWeight: '800', color: colors.gray800 },
  profileInfo: { gap: 4 },
  userName: { fontSize: 18, fontWeight: '800', color: colors.primary },
  userEmail: { fontSize: 13, color: colors.gray500 },
  statsRow: {
    flexDirection: 'row', paddingVertical: 16,
    borderBottomWidth: 8, borderColor: colors.gray100,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.gray500, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: colors.gray200 },
  menuSection: { paddingTop: 8 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 16,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  menuIcon: { fontSize: 20, width: 28 },
  menuLabel: { flex: 1, fontSize: 15, color: colors.primary },
  menuArrow: { fontSize: 20, color: colors.gray500 },
});
