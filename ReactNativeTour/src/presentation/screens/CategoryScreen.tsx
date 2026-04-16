// src/presentation/screens/CategoryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>카테고리</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  text: { fontFamily: typography.bold, fontSize: 18, color: colors.textPrimary },
});
