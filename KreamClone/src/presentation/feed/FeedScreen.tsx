import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, RefreshControl, FlatList,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { StyleCard } from './components/StyleCard';
import { useFeedViewModel } from './mvi/useFeedViewModel';
import { StyleModel } from '../../domain/model/StyleModel';
import { colors } from '../theme/colors';
import { FeedStackScreenProps } from '../navigation/types';

type Props = FeedStackScreenProps<'FeedMain'>;

export default function FeedScreen({ navigation }: Props) {
  const { state, refresh } = useFeedViewModel();

  if (state.isLoading && state.styles.length === 0) {
    return <SafeAreaWrapper><LoadingSpinner /></SafeAreaWrapper>;
  }

  if (state.error && state.styles.length === 0) {
    return (
      <SafeAreaWrapper>
        <EmptyState message="피드를 불러올 수 없습니다." subMessage={state.error} />
      </SafeAreaWrapper>
    );
  }

  const handlePress = (style: StyleModel) => {
    navigation.navigate('StyleDetail', { styleId: style.id });
  };

  return (
    <SafeAreaWrapper>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>스타일</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('StyleCreate')}>
          <Text style={styles.createBtnText}>+ 올리기</Text>
        </TouchableOpacity>
      </View>

      {/* 2열 그리드 */}
      <FlatList
        data={state.styles}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.cell}>
            <StyleCard style={item} onPress={handlePress} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={state.isLoading} onRefresh={refresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray200,
  },
  logo: { fontSize: 16, fontWeight: '800', color: colors.primary },
  createBtn: {
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: colors.primary, borderRadius: 4,
  },
  createBtnText: { fontSize: 12, fontWeight: '700', color: colors.background },
  row: { gap: 1 },
  cell: { flex: 1 },
});
