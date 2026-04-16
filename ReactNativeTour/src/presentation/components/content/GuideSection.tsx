// src/presentation/components/content/GuideSection.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { GuideSection as GuideSectionType } from '../../../domain/model/HomeContent';
import { SectionHeader } from '../common/SectionHeader';
import { GuideCard } from './GuideCard';

interface Props {
  section: GuideSectionType;
  onTabPress?: () => void;
}

export function GuideSection({ section, onTabPress }: Props) {
  return (
    <View style={styles.container}>
      <SectionHeader title={section.title} tabLabel={section.tabLabel} onTabPress={onTabPress} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {section.guides.map(guide => (
          <GuideCard key={guide.id} item={guide} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 32 },
  scrollContent: { paddingHorizontal: 20 },
});
