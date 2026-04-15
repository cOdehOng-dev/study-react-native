import React from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_COLLECTIONS } from '../../data/mock/collectionsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'Collection'>;

export default function CollectionScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="컬렉션" onBack={() => navigation.goBack()} />
      <FlatList
        data={MOCK_COLLECTIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CollectionDetail', { collectionId: item.id })}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.count}>{item.products.length}개 상품</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { borderRadius: 12, overflow: 'hidden', backgroundColor: colors.gray100 },
  image: { width: '100%', height: 180, resizeMode: 'cover' },
  info: { padding: 16 },
  title: { fontSize: 16, fontWeight: '800', color: colors.primary, marginBottom: 4 },
  desc: { fontSize: 13, color: colors.gray500, marginBottom: 8 },
  count: { fontSize: 12, color: colors.gray500 },
});
