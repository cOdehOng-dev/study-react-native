import React, { useState } from 'react';
import {
  ScrollView, View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { MOCK_STYLES } from '../../data/mock/styleMock';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';
import { FeedStackScreenProps } from '../navigation/types';

type Props = FeedStackScreenProps<'StyleDetail'>;

export default function StyleDetailScreen({ navigation, route }: Props) {
  const { styleId } = route.params;
  const style = MOCK_STYLES.find((s) => s.id === styleId) ?? MOCK_STYLES[0];
  const [liked, setLiked] = useState(style.isLiked);
  const [likeCount, setLikeCount] = useState(style.likeCount);

  const taggedProducts = ALL_PRODUCTS.filter((p) =>
    style.taggedProductIds.includes(p.id),
  );

  const handleLike = () => {
    const nowLiked = !liked;
    setLiked(nowLiked);
    setLikeCount((prev) => (nowLiked ? prev + 1 : prev - 1));
  };

  return (
    <SafeAreaWrapper>
      <Header title="스타일" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 사용자 정보 */}
        <View style={styles.userRow}>
          <TouchableOpacity
            style={styles.userInfo}
            onPress={() => navigation.navigate('FeedUser', { userId: style.userId })}>
            <Image source={{ uri: style.userAvatar }} style={styles.avatar} />
            <Text style={styles.username}>{style.username}</Text>
          </TouchableOpacity>
        </View>

        {/* 이미지 */}
        <Image source={{ uri: style.imageUri }} style={styles.mainImage} />

        {/* 액션 바 */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
            <Text style={[styles.actionIcon, liked && styles.likedIcon]}>
              {liked ? '♥' : '♡'}
            </Text>
            <Text style={styles.actionCount}>{likeCount.toLocaleString()}</Text>
          </TouchableOpacity>
          <View style={styles.actionBtn}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionCount}>{style.commentCount}</Text>
          </View>
        </View>

        {/* 설명 */}
        <View style={styles.descBox}>
          <Text style={styles.usernameInline}>{style.username}</Text>
          <Text style={styles.description}> {style.description}</Text>
        </View>

        {/* 태그된 상품 */}
        {taggedProducts.length > 0 && (
          <View style={styles.productsSection}>
            <Text style={styles.productsTitle}>스타일에 사용된 상품</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
              {taggedProducts.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <ProductCard
                    brand={product.brand}
                    name={product.name}
                    price={product.buyPrice}
                    imageUri={product.imageUri}
                    onPress={() =>
                      navigation.navigate('StyleProductDetail', { productId: product.id })
                    }
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray200 },
  username: { fontSize: 14, fontWeight: '700', color: colors.primary },
  mainImage: { width: '100%', aspectRatio: 1, backgroundColor: colors.gray100 },
  actions: {
    flexDirection: 'row', gap: 16,
    paddingHorizontal: 16, paddingVertical: 12,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionIcon: { fontSize: 22 },
  likedIcon: { color: colors.accent },
  actionCount: { fontSize: 13, color: colors.gray800 },
  descBox: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingBottom: 12 },
  usernameInline: { fontSize: 13, fontWeight: '700', color: colors.primary },
  description: { fontSize: 13, color: colors.gray800 },
  productsSection: { borderTopWidth: 8, borderColor: colors.gray100, paddingVertical: 16 },
  productsTitle: { fontSize: 14, fontWeight: '800', color: colors.primary, paddingHorizontal: 16, marginBottom: 8 },
  productScroll: { paddingLeft: 16 },
  productCard: { width: 160, marginRight: 12 },
  bottomPadding: { height: 32 },
});
