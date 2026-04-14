import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import {useAuth} from '../../context/AuthContext';
import {MyPageStackParamList} from '../../types/navigation';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<MyPageStackParamList, 'ProfileEdit'>;

const ProfileEditScreen: React.FC<Props> = ({navigation}) => {
  const {user, updateProfile} = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="프로필 수정" onBack={() => navigation.goBack()} />
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>로그인이 필요합니다</Text>
        </View>
      </View>
    );
  }

  const handleSave = () => {
    updateProfile({name, phone});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="프로필 수정" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.fieldLabel}>이름</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
            placeholderTextColor={colors.textSecondary}
          />
          <Text style={styles.fieldLabel}>전화번호</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="전화번호를 입력하세요"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />
        </Card>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  fieldLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: fontSize.md,
    color: colors.surface,
    fontWeight: '700',
  },
});

export default ProfileEditScreen;
