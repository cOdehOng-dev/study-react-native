import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from './types';
import SearchScreen from '../search/SearchScreen';
import SearchResultsScreen from '../search/SearchResultsScreen';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ALL_PRODUCTS } from '../../data/mock/productsMock';
import { colors } from '../theme/colors';

type SearchProductDetailProps = NativeStackScreenProps<SearchStackParamList, 'SearchProductDetail'>;

function SearchProductDetailScreen({ navigation, route }: SearchProductDetailProps) {
  const { productId } = route.params;
  const product = ALL_PRODUCTS.find((p) => p.id === productId) ?? ALL_PRODUCTS[0];

  return (
    <SafeAreaWrapper>
      <Header title="상품 상세" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: product.imageUri }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.buyPrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.btnRow}>
          <Button
            label="구매하기"
            onPress={() =>
              Alert.alert('안내', '홈 탭에서 상품을 검색하여 구매해주세요.')
            }
            style={styles.btn}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.gray100 },
  info: { padding: 16, gap: 6 },
  brand: { fontSize: 13, color: colors.gray500 },
  name: { fontSize: 16, fontWeight: '700', color: colors.primary },
  price: { fontSize: 20, fontWeight: '900', color: colors.primary, marginTop: 4 },
  btnRow: { padding: 16 },
  btn: { width: '100%' },
});

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="SearchProductDetail" component={SearchProductDetailScreen} />
    </Stack.Navigator>
  );
}
