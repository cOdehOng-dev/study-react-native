import React from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_EVENTS } from '../../data/mock/eventsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'EventDetail'>;

export default function EventDetailScreen({ navigation, route }: Props) {
  const event = MOCK_EVENTS.find((e) => e.id === route.params.eventId) ?? MOCK_EVENTS[0];

  return (
    <SafeAreaWrapper>
      <Header title="이벤트 상세" onBack={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: event.imageUri }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{event.isActive ? '진행중' : '종료'}</Text>
          </View>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.date}>{event.startDate} ~ {event.endDate}</Text>
          <View style={styles.divider} />
          <Text style={styles.desc}>{event.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 240, resizeMode: 'cover' },
  content: { padding: 20 },
  badge: { backgroundColor: colors.accent, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { color: colors.background, fontSize: 11, fontWeight: '700' },
  title: { fontSize: 20, fontWeight: '800', color: colors.primary, marginBottom: 8 },
  date: { fontSize: 13, color: colors.gray500 },
  divider: { height: 1, backgroundColor: colors.gray100, marginVertical: 16 },
  desc: { fontSize: 15, color: colors.gray800, lineHeight: 22 },
});
