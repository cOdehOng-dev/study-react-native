// src/presentation/screens/HomeScreen.tsx
import React from 'react';
import { ScrollView, View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useHomeViewModel } from '../mvi/home/useHomeViewModel';
import { useSearchViewModel } from '../mvi/search/useSearchViewModel';
import { AppGnbHeader } from '../components/gnb/AppGnbHeader';
import { SearchModule } from '../components/search/SearchModule';
import { CategoryShortcuts } from '../components/shortcuts/CategoryShortcuts';
import { NoticeBanner } from '../components/content/NoticeBanner';
import { AdBanner } from '../components/content/AdBanner';
import { ProductSection } from '../components/content/ProductSection';
import { GuideSection } from '../components/content/GuideSection';
import { FlightDealSection } from '../components/content/FlightDealSection';
import { BannerListSection } from '../components/content/BannerListSection';
import { NolLiveSection } from '../components/content/NolLiveSection';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function HomeScreen() {
  const { state: homeState, reload } = useHomeViewModel();
  const {
    state: searchState,
    selectTab,
    swapCities,
  } = useSearchViewModel();

  if (homeState.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (homeState.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{homeState.error}</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={reload}
          accessibilityRole="button"
          accessibilityLabel="다시 시도"
        >
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const content = homeState.content;
  if (!content) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppGnbHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.searchSection}>
          <SearchModule
            state={searchState}
            onSelectTab={selectTab}
            onSwapCities={swapCities}
          />
        </View>

        <CategoryShortcuts />

        <NoticeBanner notice={content.notice} />

        <AdBanner banner={content.adBanner} />

        {content.productSections.map(section => (
          <ProductSection key={section.id} section={section} />
        ))}

        <GuideSection section={content.guideSection} />

        <FlightDealSection section={content.flightDeals} />

        <View style={styles.bannerListSection}>
          <BannerListSection banners={content.bannerList} />
        </View>

        <NolLiveSection section={content.nolLive} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchSection: {
    paddingVertical: 8,
  },
  bannerListSection: {
    paddingTop: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  errorText: {
    fontFamily: typography.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    fontFamily: typography.bold,
    fontSize: 15,
    color: colors.white,
  },
});
