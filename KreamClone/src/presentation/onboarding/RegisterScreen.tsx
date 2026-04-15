import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useOnboardingViewModel } from './mvi/useOnboardingViewModel';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { state, register } = useOnboardingViewModel();

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      return;
    }
    const success = await register(email, password, name);
    if (success) {
      navigation.replace('Main');
    }
  };

  const passwordMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;

  return (
    <SafeAreaWrapper>
      <Header title="회원가입" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름"
              placeholderTextColor={colors.gray500}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor={colors.gray500}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호 (8자 이상)"
              placeholderTextColor={colors.gray500}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              style={[styles.input, passwordMismatch && styles.inputError]}
              placeholder="비밀번호 확인"
              placeholderTextColor={colors.gray500}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
            />
            {passwordMismatch && (
              <Text style={styles.error}>비밀번호가 일치하지 않습니다.</Text>
            )}

            {state.error ? <Text style={styles.error}>{state.error}</Text> : null}

            <Button
              label="가입하기"
              onPress={handleRegister}
              isLoading={state.isLoading}
              disabled={passwordMismatch}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, padding: spacing.lg },
  form: { gap: 8 },
  label: { fontSize: 13, fontWeight: '600', color: colors.primary, marginTop: 8 },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.primary,
  },
  inputError: { borderColor: colors.accent },
  error: { color: colors.accent, fontSize: 12 },
  button: { marginTop: spacing.lg },
});
