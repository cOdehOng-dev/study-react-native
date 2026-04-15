import React, { useState } from 'react';
import {
  View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { MyPageStackScreenProps } from '../navigation/types';

type Props = MyPageStackScreenProps<'AccountSettings'>;

export default function AccountSettingsScreen({ navigation }: Props) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠어요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃', style: 'destructive',
        onPress: () => {
          // TODO: API 연동 필요 — POST /api/v1/auth/logout
          // Navigate up: MyPageStack → BottomTab → RootStack (where Login lives)
          navigation.getParent()?.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <Header title="계정 설정" onBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>푸시 알림</Text>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} trackColor={{ true: colors.primary }} />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>마케팅 알림</Text>
            <Switch value={marketingEnabled} onValueChange={setMarketingEnabled} trackColor={{ true: colors.primary }} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>이메일 변경</Text>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>비밀번호 변경</Text>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>버전</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  section: { padding: 16, borderBottomWidth: 8, borderColor: colors.gray100 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.gray500, marginBottom: 8 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, borderColor: colors.gray100,
  },
  rowLabel: { fontSize: 15, color: colors.primary },
  rowArrow: { fontSize: 20, color: colors.gray500 },
  rowValue: { fontSize: 14, color: colors.gray500 },
  logoutBtn: {
    margin: 24, padding: 16, borderRadius: 8,
    borderWidth: 1, borderColor: colors.accent, alignItems: 'center',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: colors.accent },
});
