import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_NEW_ARRIVALS } from '../../data/mock/productsMock';
import { ProductCard } from '../components/ProductCard';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'NewArrival'>;

export default function NewArrivalScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="신규 입고" onBack={() => navigation.goBack()} />
      <FlatList
        data={MOCK_NEW_ARRIVALS}
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
  list: { paddingHorizontal: 8, paddingTop: 8 },
  cardWrapper: { flex: 1, padding: 8 },
});
