import React from 'react';
import {
  View, TextInput, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, onSubmit, onClear, placeholder = '브랜드, 상품명 검색' }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSubmit(value)}
          placeholder={placeholder}
          placeholderTextColor={colors.gray500}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.gray100, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8, gap: 8,
  },
  searchIcon: { fontSize: 16 },
  input: { flex: 1, fontSize: 14, color: colors.primary },
  clearBtn: { padding: 4 },
  clearText: { fontSize: 14, color: colors.gray500 },
});
