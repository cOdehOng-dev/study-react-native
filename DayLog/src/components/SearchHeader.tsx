import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchContext from '../contexts/SearchContext';

function SearchHeader() {
  const { width } = useWindowDimensions();
  const { keyword, onChangeKeyword } = useContext(SearchContext);

  return (
    <View style={[styles.block, { width: width - 32 }]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력해주세요"
        autoFocus
        value={keyword}
        onChangeText={onChangeKeyword}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
        onPress={() => onChangeKeyword('')}
      >
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;
