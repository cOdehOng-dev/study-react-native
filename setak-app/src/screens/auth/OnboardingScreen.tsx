import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import Button from '../../components/common/Button';
import {colors, spacing, fontSize} from '../../constants/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const slides = [
  {icon: '🚚', title: '문 앞에서 수거', desc: '예약하면 집 앞에서 바로 수거해드려요'},
  {icon: '✨', title: '전문가 세탁', desc: '전문 세탁사가 옷감에 맞게 깨끗이 세탁해드려요'},
  {icon: '📦', title: '깔끔하게 배달', desc: '세탁이 완료되면 집 앞으로 배달해드려요'},
];

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const isLast = index === slides.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Text style={styles.icon}>{slides[index].icon}</Text>
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.desc}>{slides[index].desc}</Text>
      </View>
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button
          title={isLast ? '시작하기' : '다음'}
          onPress={() =>
            isLast ? navigation.replace('Login') : setIndex(i => i + 1)
          }
        />
        {!isLast && (
          <Button
            title="건너뛰기"
            variant="ghost"
            onPress={() => navigation.replace('Login')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  icon: {fontSize: 80, marginBottom: spacing.lg},
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  desc: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {backgroundColor: colors.primary, width: 24},
  buttons: {paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.sm},
});

export default OnboardingScreen;
