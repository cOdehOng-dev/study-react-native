import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_NOTIFICATIONS } from '../../data/mock/notificationsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'Notification'>;

const typeColors: Record<string, string> = {
  '거래': colors.accent,
  '이벤트': '#5B4FCF',
  '시스템': colors.gray500,
  '찜': '#E91E8C',
};

export default function NotificationScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="알림" onBack={() => navigation.goBack()} />
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.row, !item.isRead && styles.unread]}
            onPress={() => navigation.navigate('NotificationDetail', { notificationId: item.id })}>
            <View style={[styles.typeDot, { backgroundColor: typeColors[item.type] ?? colors.gray500 }]} />
            <View style={styles.info}>
              <View style={styles.topRow}>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.time}>{item.createdAt.slice(0, 10)}</Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  unread: { backgroundColor: '#FFF8F7' },
  typeDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  info: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  type: { fontSize: 11, fontWeight: '700', color: colors.gray500 },
  time: { fontSize: 11, color: colors.gray500 },
  title: { fontSize: 14, fontWeight: '700', color: colors.primary, marginBottom: 2 },
  body: { fontSize: 13, color: colors.gray500, lineHeight: 18 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginTop: 6 },
  sep: { height: 1, backgroundColor: colors.gray100 },
});
