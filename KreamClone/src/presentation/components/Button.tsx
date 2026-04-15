import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<Props> = ({
  label, onPress, variant = 'primary', disabled, isLoading, style,
}) => {
  const containerStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'ghost' && styles.ghost,
    (disabled || isLoading) && styles.disabled,
    style,
  ];
  const textStyle = [
    styles.text,
    variant === 'secondary' && styles.textSecondary,
    variant === 'ghost' && styles.textGhost,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled || isLoading}>
      {isLoading
        ? <ActivityIndicator color={variant === 'primary' ? colors.background : colors.primary} />
        : <Text style={textStyle}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { height: 52, borderRadius: 4, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.primary },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.4 },
  text: { color: colors.background, fontSize: 15, fontWeight: '700' },
  textSecondary: { color: colors.primary },
  textGhost: { color: colors.gray500 },
});
