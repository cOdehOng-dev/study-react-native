import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import {useAuth} from '../../context/AuthContext';
import {MyPageStackParamList} from '../../types/navigation';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<MyPageStackParamList, 'MyPageHome'>;

const MyPageScreen: React.FC<Props> = ({navigation}) => {
  const {user, logout} = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="마이페이지" />
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>로그인이 필요합니다</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="마이페이지" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeText}>{user.membershipGrade}</Text>
          </View>
        </Card>

        <Card style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ProfileEdit')}>
            <Text style={styles.menuLabel}>프로필 수정</Text>
            <Text style={styles.menuArrow}>{'›'}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AddressManage')}>
            <Text style={styles.menuLabel}>배송지 관리</Text>
            <Text style={styles.menuArrow}>{'›'}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Notification')}>
            <Text style={styles.menuLabel}>알림 설정</Text>
            <Text style={styles.menuArrow}>{'›'}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={styles.menuLabelLogout}>로그아웃</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  gradeBadge: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  gradeText: {
    fontSize: fontSize.sm,
    color: colors.surface,
    fontWeight: '600',
  },
  menuCard: {
    paddingVertical: spacing.xs,
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  menuLabel: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  menuLabelLogout: {
    fontSize: fontSize.md,
    color: colors.error,
  },
  menuArrow: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
});

export default MyPageScreen;
