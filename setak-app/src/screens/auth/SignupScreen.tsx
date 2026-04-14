import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import {useAuth} from '../../context/AuthContext';
import {mockUser} from '../../data/mockUser';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const {login} = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (step === 3) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>🎉</Text>
        <Text style={styles.successTitle}>가입 완료!</Text>
        <Text style={styles.successDesc}>세탁특공대 회원이 되신 걸 환영해요</Text>
        <Button title="시작하기" onPress={() => login({...mockUser, name, email, phone})} style={styles.startButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="회원가입" onBack={() => (step > 1 ? setStep(s => s - 1) : navigation.goBack())} />
      <View style={styles.steps}>
        {[1, 2].map(s => (
          <View key={s} style={[styles.stepDot, s <= step && styles.stepDotActive]} />
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <>
            <Text style={styles.stepTitle}>전화번호 입력</Text>
            <TextInput
              style={styles.input}
              placeholder="010-0000-0000"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />
            <Button title="인증번호 받기 (mock)" onPress={() => setStep(2)} style={styles.button} />
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.stepTitle}>프로필 입력</Text>
            <TextInput
              style={styles.input}
              placeholder="이름"
              value={name}
              onChangeText={setName}
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
            />
            <Button title="가입 완료" onPress={() => setStep(3)} style={styles.button} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  steps: {flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md},
  stepDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border},
  stepDotActive: {backgroundColor: colors.primary, width: 24},
  content: {padding: spacing.lg},
  stepTitle: {fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.lg},
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  button: {marginTop: spacing.sm},
  successContainer: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: spacing.xl},
  successIcon: {fontSize: 64, marginBottom: spacing.lg},
  successTitle: {fontSize: fontSize.xl, fontWeight: '800', color: colors.text, marginBottom: spacing.sm},
  successDesc: {fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.xl},
  startButton: {width: '100%'},
});

export default SignupScreen;
