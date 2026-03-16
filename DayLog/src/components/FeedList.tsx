import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LogProps } from '../contexts/LogContext';
import FeedListItem from './FeedListItem';

function FeedList({
  logs,
  onScrolledToBottom,
  ListHeaderComponent,
}: {
  logs: LogProps[];
  onScrolledToBottom?: (isBottom: boolean) => void;
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}) {
  const onScroll = e => {
    if (!onScrolledToBottom) {
      return;
    }
    const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceFromBottom < 72) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };
  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({ item }) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      onScroll={onScroll}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
