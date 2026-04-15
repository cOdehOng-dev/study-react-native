import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 3) / 2;

type Props = HomeStackScreenProps<'StyleFeed'>;

export default function StyleFeedScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="스타일" onBack={() => navigation.goBack()} />
      <FlatList
        data={ALL_PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>
              <Text style={styles.price}>{item.buyPrice.toLocaleString()}원</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  item: { width: ITEM_SIZE, margin: 0.5 },
  image: { width: ITEM_SIZE, height: ITEM_SIZE, resizeMode: 'cover' },
  info: { padding: 8, backgroundColor: colors.background },
  brand: { fontSize: 12, color: colors.gray500 },
  price: { fontSize: 13, fontWeight: '700', color: colors.primary },
});
