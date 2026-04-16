// src/presentation/screens/SearchScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>검색</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  text: { fontFamily: typography.bold, fontSize: 18, color: colors.textPrimary },
});
