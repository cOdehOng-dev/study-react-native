import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  visible: boolean;
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
}

export const BottomSheet: React.FC<Props> = ({ visible, title, options, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay} />
    </TouchableWithoutFeedback>
    <View style={styles.container}>
      <View style={styles.handle} />
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option} onPress={() => { onSelect(item); onClose(); }}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    maxHeight: '60%',
  },
  handle: { width: 40, height: 4, backgroundColor: colors.gray200, borderRadius: 2, alignSelf: 'center', marginVertical: 12 },
  title: { fontSize: 16, fontWeight: '700', textAlign: 'center', paddingBottom: 16, borderBottomWidth: 1, borderColor: colors.gray200 },
  option: { paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderColor: colors.gray100 },
  optionText: { fontSize: 15, color: colors.primary },
});
