import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Button } from '../components/Button';
import { useOnboardingViewModel } from './mvi/useOnboardingViewModel';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, login } = useOnboardingViewModel();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigation.replace('Main');
    }
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>KREAM</Text>
          <Text style={styles.subtitle}>리셀 플랫폼 No.1</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor={colors.gray500}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor={colors.gray500}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {state.error ? <Text style={styles.error}>{state.error}</Text> : null}

            <Button
              label="로그인"
              onPress={handleLogin}
              isLoading={state.isLoading}
              style={styles.button}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>또는</Text>
              <View style={styles.line} />
            </View>

            <Button
              label="회원가입"
              onPress={() => navigation.navigate('Register')}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: spacing.lg, justifyContent: 'center' },
  logo: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 6,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.gray500,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  form: { gap: 12 },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.primary,
    backgroundColor: colors.background,
  },
  error: { color: colors.accent, fontSize: 13, marginTop: -4 },
  button: { marginTop: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  line: { flex: 1, height: 1, backgroundColor: colors.gray200 },
  dividerText: { color: colors.gray500, fontSize: 13 },
});
