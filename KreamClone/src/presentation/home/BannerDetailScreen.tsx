import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_BANNERS_DATA } from '../../data/mock/bannersMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'BannerDetail'>;

export default function BannerDetailScreen({ navigation, route }: Props) {
  const banner = MOCK_BANNERS_DATA.find((b) => b.id === route.params.bannerId) ?? MOCK_BANNERS_DATA[0];

  return (
    <SafeAreaWrapper>
      <Header title="" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: banner.imageUri }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{banner.title}</Text>
          <Text style={styles.subtitle}>{banner.subtitle}</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 280, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: '800', color: colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 15, color: colors.gray500, lineHeight: 22 },
});
