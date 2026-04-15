import React from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { MOCK_EVENTS } from '../../data/mock/eventsMock';
import { colors } from '../theme/colors';
import { HomeStackScreenProps } from '../navigation/types';

type Props = HomeStackScreenProps<'Event'>;

export default function EventScreen({ navigation }: Props) {
  return (
    <SafeAreaWrapper>
      <Header title="이벤트" onBack={() => navigation.goBack()} />
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.startDate} ~ {item.endDate}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { borderRadius: 8, overflow: 'hidden', backgroundColor: colors.gray100 },
  image: { width: '100%', height: 160, resizeMode: 'cover' },
  info: { padding: 12 },
  title: { fontSize: 15, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  date: { fontSize: 12, color: colors.gray500 },
});
