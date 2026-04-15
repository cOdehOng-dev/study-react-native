import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { EmptyState } from '../components/EmptyState';
import { MOCK_STYLES } from '../../data/mock/styleMock';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'MyStyles'>;

const CARD_SIZE = (Dimensions.get('window').width - 3) / 2;
const MY_STYLES = MOCK_STYLES.filter((s) => s.userId === 'u001');

export default function MyStylesScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="내 스타일" onBack={() => navigation.goBack()} />
      {MY_STYLES.length === 0 ? (
        <EmptyState message="등록된 스타일이 없습니다." subMessage="스타일을 올려보세요." />
      ) : (
        <FlatList
          data={MY_STYLES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MyStyleDetail', { styleId: item.id })}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.likeText}>♥ {item.likeCount.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  row: { gap: 1 },
  card: { width: CARD_SIZE, height: CARD_SIZE },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 6, backgroundColor: 'rgba(0,0,0,0.35)',
  },
  likeText: { color: colors.background, fontSize: 11, fontWeight: '700' },
});
