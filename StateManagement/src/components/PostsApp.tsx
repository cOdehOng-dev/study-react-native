import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePosts from '../hooks/usePosts';

function PostsApp() {
  const { data, loading, refetch } = usePosts({ enabled: true });
  return (
    <SafeAreaView style={styles.black}>
      {data ? (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <ActivityIndicator size="large" color="black" style={styles.loading} />
      )}
      <Button title="새로고침" onPress={refetch} disabled={loading} />
    </SafeAreaView>
  );
}

export default PostsApp;

const styles = StyleSheet.create({
  black: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  item: { padding: 8 },
  separator: { height: 1, backgroundColor: 'black' },
});
