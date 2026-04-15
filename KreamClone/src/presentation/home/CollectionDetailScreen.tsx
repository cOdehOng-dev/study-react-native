import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_COLLECTIONS } from '../../data/mock/collectionsMock';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { ProductCard } from '../components/ProductCard';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'CollectionDetail'>;

export default function CollectionDetailScreen({ navigation, route }: Props) {
  const collection = MOCK_COLLECTIONS.find((c) => c.id === route.params.collectionId) ?? MOCK_COLLECTIONS[0];
  const products = ALL_PRODUCTS.filter((p) => collection.products.includes(p.id));

  return (
    <SafeAreaWrapper>
      <Header title={collection.title} onBack={() => navigation.goBack()} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerBox}>
            <Image source={{ uri: collection.imageUri }} style={styles.image} />
            <Text style={styles.desc}>{collection.description}</Text>
          </View>
        }
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              brand={item.brand}
              name={item.name}
              price={item.buyPrice}
              imageUri={item.imageUri}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  headerBox: { marginBottom: 8 },
  image: { width: '100%', height: 200, resizeMode: 'cover' },
  desc: { padding: 16, fontSize: 14, color: colors.gray500 },
  list: { paddingHorizontal: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
