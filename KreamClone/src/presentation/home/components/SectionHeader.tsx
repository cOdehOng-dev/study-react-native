import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  title: string;
  onMore?: () => void;
};

export const SectionHeader = ({ title, onMore }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {onMore && (
      <TouchableOpacity onPress={onMore}>
        <Text style={styles.more}>전체보기</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 16, fontWeight: '800', color: colors.primary },
  more: { fontSize: 13, color: colors.gray500 },
});
