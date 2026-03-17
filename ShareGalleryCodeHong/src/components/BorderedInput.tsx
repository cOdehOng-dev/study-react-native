import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

type Props = {
  hasMarginBottom?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  placeholder?: string;
  autoCaptialzie?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoCompleteType?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel';
  keyboardType?: 'default' | 'email-address';
  secureTextEntry?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
};

function BorderedInput(
  { hasMarginBottom, ...rest }: Props,
  ref: React.Ref<TextInput>,
) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      autoCapitalize="none"
      {...rest}
      ref={ref}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderedInput);
