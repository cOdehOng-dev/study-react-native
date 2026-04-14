import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import {MyPageStackParamList} from '../../types/navigation';
import {colors, spacing, fontSize, radius} from '../../constants/theme';

type Props = NativeStackScreenProps<MyPageStackParamList, 'AddressManage'>;

const SAVED_ADDRESSES = [
  '서울시 강남구 테헤란로 123',
  '서울시 마포구 홍익로 45',
  '서울시 송파구 올림픽로 200',
];

const AddressManageScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="배송지 관리" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          {SAVED_ADDRESSES.map((address, index) => (
            <View key={address}>
              <View style={styles.addressRow}>
                <View style={styles.addressIcon}>
                  <Text style={styles.addressIconText}>{'📍'}</Text>
                </View>
                <Text style={styles.addressText}>{address}</Text>
              </View>
              {index < SAVED_ADDRESSES.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>
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
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  addressIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  addressIconText: {
    fontSize: fontSize.md,
  },
  addressText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});

export default AddressManageScreen;
