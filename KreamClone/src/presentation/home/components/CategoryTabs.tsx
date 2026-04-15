import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryTabs: React.FC<Props> = ({ categories, selected, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}>
    {['전체', ...categories].map((cat) => (
      <TouchableOpacity
        key={cat}
        style={[styles.tab, selected === cat && styles.tabActive]}
        onPress={() => onSelect(cat)}>
        <Text style={[styles.label, selected === cat && styles.labelActive]}>
          {cat}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.background,
  },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontSize: 13, color: colors.gray800 },
  labelActive: { color: colors.background, fontWeight: '700' },
});
