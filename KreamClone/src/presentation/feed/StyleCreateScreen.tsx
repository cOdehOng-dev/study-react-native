import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';
import { FeedStackScreenProps } from '../navigation/types';

type Props = FeedStackScreenProps<'StyleCreate'>;

export default function StyleCreateScreen({ navigation }: Props) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('알림', '스타일 설명을 입력해주세요.');
      return;
    }
    // TODO: API 연동 필요 — POST /api/v1/styles
    Alert.alert('완료', '스타일이 업로드되었습니다.', [
      { text: '확인', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <Header title="스타일 올리기" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* 이미지 선택 영역 (Mock) */}
        <TouchableOpacity style={styles.imagePicker}>
          <Text style={styles.imagePickerIcon}>📷</Text>
          <Text style={styles.imagePickerText}>사진 추가</Text>
          <Text style={styles.imagePickerSub}>Mock — 실제 업로드 미지원</Text>
        </TouchableOpacity>

        {/* 설명 입력 */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>스타일 설명</Text>
          <TextInput
            style={styles.textInput}
            placeholder="스타일을 설명해주세요 (최대 200자)"
            placeholderTextColor={colors.gray500}
            multiline
            maxLength={200}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.charCount}>{description.length}/200</Text>
        </View>

        <Button
          label="스타일 올리기"
          onPress={handleSubmit}
          style={styles.submitBtn}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  imagePicker: {
    height: 200, borderRadius: 12,
    borderWidth: 2, borderStyle: 'dashed', borderColor: colors.gray200,
    alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.gray100,
  },
  imagePickerIcon: { fontSize: 40 },
  imagePickerText: { fontSize: 15, fontWeight: '700', color: colors.primary },
  imagePickerSub: { fontSize: 12, color: colors.gray500 },
  inputSection: { gap: 8 },
  label: { fontSize: 14, fontWeight: '700', color: colors.primary },
  textInput: {
    borderWidth: 1, borderColor: colors.gray200, borderRadius: 8,
    padding: 12, fontSize: 14, color: colors.primary,
    minHeight: 100, textAlignVertical: 'top',
  },
  charCount: { fontSize: 11, color: colors.gray500, textAlign: 'right' },
  submitBtn: { marginTop: 8 },
});
