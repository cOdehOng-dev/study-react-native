import React, { use, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm, {
  type SignForm as SignFormType,
} from '../components/SignForm';
import { RootStackScreenProps } from './RootStack';
import { signIn, signUp } from '../../libs/auth';
import { getUser } from '../../libs/users';
import { useUserContext } from '../../contexts/UserContext';

type Props = RootStackScreenProps<'SignIn'>;

function SignInScreen({ navigation, route }: Props) {
  const { isSignUp } = route.params || {};
  const [form, setForm] = useState<SignFormType>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    const { email, password, confirmPassword } = form;
    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    const info = { email, password };

    try {
      const { user } = isSignUp ? await signUp(info) : await signIn(info);
      const profile = await getUser(user.uid);
      if (!profile) {
        navigation.navigate('Welcome', { uid: user.uid });
      } else {
        setUser(profile);
      }
    } catch (e) {
      const message: Record<string, string> = {
        'auth/email-already-in-use': '이미 사용중인 이메일입니다.',
        'auth/invalid-email': '유효하지 않은 이메일입니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/user-not-found': '존재하지 않는 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호입니다.',
      };
      const code = (e as { code?: string }).code ?? '';
      const msg = message[code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ ios: 'padding' })}
    >
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>ShareGallery</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <View style={styles.buttons}>
            <SignButtons
              isSignUp={isSignUp}
              onSubmit={onSubmit}
              isLoading={loading}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignInScreen;
