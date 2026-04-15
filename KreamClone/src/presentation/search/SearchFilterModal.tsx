import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { colors } from '../theme/colors';

const CATEGORIES = ['스니커즈', '어패럴', '아우터', '탑', '팬츠', '가방', '모자', '기타'];

interface Props {
  visible: boolean;
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
  onClose: () => void;
}

export function SearchFilterModal({ visible, selectedCategory, onSelect, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>카테고리 필터</Text>

        <TouchableOpacity
          style={[styles.row, !selectedCategory && styles.rowActive]}
          onPress={() => onSelect(null)}>
          <Text style={[styles.rowText, !selectedCategory && styles.rowTextActive]}>전체</Text>
          {!selectedCategory && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.row, selectedCategory === item && styles.rowActive]}
              onPress={() => onSelect(item)}>
              <Text style={[styles.rowText, selectedCategory === item && styles.rowTextActive]}>
                {item}
              </Text>
              {selectedCategory === item && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingBottom: 32, maxHeight: '70%',
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: colors.gray200,
    alignSelf: 'center', marginVertical: 12,
  },
  title: {
    fontSize: 16, fontWeight: '800', color: colors.primary,
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  rowActive: { backgroundColor: '#FFF5F4' },
  rowText: { fontSize: 14, color: colors.primary },
  rowTextActive: { color: colors.accent, fontWeight: '700' },
  check: { fontSize: 16, color: colors.accent },
});
