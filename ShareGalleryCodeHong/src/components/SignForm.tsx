import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import BorderedInput from './BorderedInput';

export type SignForm = {
  email: string;
  password: string;
  confirmPassword: string;
};
type Props = {
  isSignUp?: boolean;
  onSubmit: () => void;
  form: SignForm;
  createChangeTextHandler: (name: string) => (value: string) => void;
};

function SignForm({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}: Props) {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCaptialzie="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current?.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});

export default SignForm;
