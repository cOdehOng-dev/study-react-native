// src/presentation/components/content/ProductSection.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ProductSection as ProductSectionType } from '../../../domain/model/HomeContent';
import { SectionHeader } from '../common/SectionHeader';
import { ProductCard } from './ProductCard';
import { colors } from '../../theme/colors';

interface Props {
  section: ProductSectionType;
  onTabPress?: () => void;
}

export function ProductSection({ section, onTabPress }: Props) {
  const isGrid = section.type === 'two_column_grid';

  return (
    <View style={styles.container}>
      <SectionHeader title={section.title} tabLabel={section.tabLabel} onTabPress={onTabPress} />
      {isGrid ? (
        <View style={styles.grid}>
          {section.items.map(item => (
            <ProductCard key={item.id} item={item} type={section.type} />
          ))}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {section.items.map(item => (
            <ProductCard key={item.id} item={item} type={section.type} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
});
