import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ProductModel } from '../../../domain/model/ProductModel';
import { ProductCard } from '../../components/ProductCard';

type Props = {
  products: ProductModel[];
  onPress: (product: ProductModel) => void;
};

export const ProductSection = ({ products, onPress }: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {products.map(product => (
      <ProductCard
        key={product.id}
        brand={product.brand}
        name={product.name}
        price={product.buyPrice}
        imageUri={product.imageUri}
        onPress={() => onPress(product)}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 8 },
});
