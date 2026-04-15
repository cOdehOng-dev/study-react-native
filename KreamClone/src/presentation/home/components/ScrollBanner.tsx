import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BannerModel } from '../../../domain/model/BannerModel';
import { colors } from '../../theme/colors';
import FastImage from 'react-native-fast-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  banners: BannerModel[];
  onPress: (banner: BannerModel) => void;
};

export const ScrollBanner = ({ banners, onPress }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {banners.map(banner => (
          <TouchableOpacity
            key={banner.id}
            style={styles.slide}
            onPress={() => onPress(banner)}
            activeOpacity={0.95}
          >
            <FastImage source={{ uri: banner.imageUri }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{banner.title}</Text>
              <Text style={styles.subtitle}>{banner.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative' },
  slide: { width: SCREEN_WIDTH, height: 200 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  title: { color: colors.background, fontSize: 18, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  dots: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray200,
    marginHorizontal: 3,
  },
  dotActive: { backgroundColor: colors.primary, width: 12 },
});
