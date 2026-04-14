import React, {useState} from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation';
import Button from '../../components/common/Button';
import {useAuth} from '../../context/AuthContext';
import {mockUser} from '../../data/mockUser';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // mock: 어떤 값이든 로그인 성공
    login(mockUser);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>세탁특공대</Text>
      <Text style={styles.subtitle}>세탁특공대에 오신 걸 환영해요</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={colors.textSecondary}
      />

      <Button title="로그인" onPress={handleLogin} style={styles.loginButton} />

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>또는</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtons}>
        {['카카오로 로그인', '네이버로 로그인', 'Google로 로그인'].map(label => (
          <TouchableOpacity
            key={label}
            style={styles.socialButton}
            onPress={handleLogin}>
            <Text style={styles.socialButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          계정이 없으신가요? <Text style={styles.signupHighlight}>회원가입</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  content: {padding: spacing.lg, paddingTop: spacing.xl * 2},
  title: {fontSize: fontSize.xxl, fontWeight: '800', color: colors.text, marginBottom: spacing.sm},
  subtitle: {fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.xl},
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
  loginButton: {marginTop: spacing.sm},
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  line: {flex: 1, height: 1, backgroundColor: colors.border},
  dividerText: {fontSize: fontSize.sm, color: colors.textSecondary},
  socialButtons: {gap: spacing.sm},
  socialButton: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  socialButtonText: {fontSize: fontSize.md, color: colors.text, fontWeight: '500'},
  signupLink: {marginTop: spacing.xl, alignItems: 'center'},
  signupText: {fontSize: fontSize.md, color: colors.textSecondary},
  signupHighlight: {color: colors.primary, fontWeight: '700'},
});

export default LoginScreen;
