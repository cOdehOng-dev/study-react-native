import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_NOTIFICATIONS } from '../../data/mock/notificationsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'NotificationDetail'>;

export default function NotificationDetailScreen({ navigation, route }: Props) {
  const notif = MOCK_NOTIFICATIONS.find((n) => n.id === route.params.notificationId) ?? MOCK_NOTIFICATIONS[0];

  return (
    <SafeAreaWrapper>
      <Header title="알림 상세" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notif.type}</Text>
        </View>
        <Text style={styles.title}>{notif.title}</Text>
        <Text style={styles.time}>{notif.createdAt.replace('T', ' ').slice(0, 16)}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{notif.body}</Text>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  badge: {
    backgroundColor: colors.gray100, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 4, alignSelf: 'flex-start', marginBottom: 12,
  },
  badgeText: { fontSize: 12, fontWeight: '700', color: colors.gray800 },
  title: { fontSize: 20, fontWeight: '800', color: colors.primary, marginBottom: 4 },
  time: { fontSize: 12, color: colors.gray500, marginBottom: 16 },
  divider: { height: 1, backgroundColor: colors.gray100, marginBottom: 16 },
  body: { fontSize: 15, color: colors.gray800, lineHeight: 24 },
});
