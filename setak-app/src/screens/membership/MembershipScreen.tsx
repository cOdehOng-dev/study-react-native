import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import {useAuth} from '../../context/AuthContext';
import {colors, spacing, fontSize, radius} from '../../constants/theme';
import {User} from '../../types/models';

type MembershipGrade = User['membershipGrade'];

interface GradeBenefit {
  grade: MembershipGrade;
  benefit: string;
}

const GRADE_BENEFITS: GradeBenefit[] = [
  {grade: '일반', benefit: '기본 혜택 (0~4,999p)'},
  {grade: '실버', benefit: '5% 추가 적립 (5,000~19,999p)'},
  {grade: '골드', benefit: '10% 추가 적립 + 무료 픽업 (20,000p+)'},
];

const getGradeBannerStyle = (grade: User['membershipGrade']) => {
  if (grade === '골드') {
    return styles.gradeBannerGold;
  }
  if (grade === '실버') {
    return styles.gradeBannerSilver;
  }
  return styles.gradeBannerGeneral;
};

const MembershipScreen: React.FC = () => {
  const {user} = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="멤버십" />
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>로그인이 필요합니다</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="멤버십" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.gradeBanner, getGradeBannerStyle(user.membershipGrade)]}>
          <Text style={styles.gradeLabel}>{user.membershipGrade}</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>

        <Card style={styles.pointsCard}>
          <Text style={styles.pointsTitle}>보유 포인트</Text>
          <Text style={styles.pointsValue}>
            {user.points.toLocaleString()} 포인트
          </Text>
        </Card>

        <Card style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>등급별 혜택</Text>
          {GRADE_BENEFITS.map(item => {
            const isCurrentGrade = item.grade === user.membershipGrade;
            return (
              <View
                key={item.grade}
                testID={isCurrentGrade ? `grade-row-${item.grade}` : undefined}
                style={[
                  styles.benefitRow,
                  isCurrentGrade && styles.benefitRowHighlighted,
                ]}>
                <Text
                  style={[
                    styles.benefitGrade,
                    isCurrentGrade && styles.benefitGradeHighlighted,
                  ]}>
                  {item.grade}
                </Text>
                <Text
                  style={[
                    styles.benefitText,
                    isCurrentGrade && styles.benefitTextHighlighted,
                  ]}>
                  {item.benefit}
                </Text>
              </View>
            );
          })}
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
  gradeBanner: {
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  gradeBannerGeneral: {backgroundColor: '#94A3B8'},
  gradeBannerSilver: {backgroundColor: '#6B7280'},
  gradeBannerGold: {backgroundColor: '#F59E0B'},
  gradeLabel: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: fontSize.lg,
    color: colors.surfaceSubtle,
  },
  pointsCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  pointsTitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  pointsValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  benefitsCard: {
    paddingVertical: spacing.md,
  },
  benefitsTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },
  benefitRowHighlighted: {
    backgroundColor: colors.background,
  },
  benefitGrade: {
    width: 48,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  benefitGradeHighlighted: {
    fontWeight: '700',
    color: colors.text,
  },
  benefitText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  benefitTextHighlighted: {
    fontWeight: '700',
    color: colors.text,
  },
});

export default MembershipScreen;
