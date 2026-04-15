import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { StyleCard } from './components/StyleCard';
import { MOCK_STYLES } from '../../data/mock/styleMock';
import { StyleModel } from '../../domain/model/StyleModel';
import { colors } from '../theme/colors';
import { FeedStackScreenProps } from '../navigation/types';

type Props = FeedStackScreenProps<'FeedUser'>;

export default function FeedUserScreen({ navigation, route }: Props) {
  const { userId } = route.params;
  const userStyles = MOCK_STYLES.filter((s) => s.userId === userId);
  const user = userStyles[0];

  const handleStylePress = (style: StyleModel) => {
    navigation.navigate('StyleDetail', { styleId: style.id });
  };

  return (
    <SafeAreaWrapper>
      <Header title="스타일 프로필" onBack={() => navigation.goBack()} />
      {user && (
        <View style={styles.profileSection}>
          <Image source={{ uri: user.userAvatar }} style={styles.avatar} />
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.styleCount}>스타일 {userStyles.length}개</Text>
        </View>
      )}

      <FlatList
        data={userStyles}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.cell}>
            <StyleCard style={item} onPress={handleStylePress} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>아직 스타일이 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center', paddingVertical: 24,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.gray200, marginBottom: 10 },
  username: { fontSize: 16, fontWeight: '800', color: colors.primary },
  styleCount: { fontSize: 13, color: colors.gray500, marginTop: 4 },
  row: { gap: 1 },
  cell: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 14, color: colors.gray500 },
});
