import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import {MyPageStackParamList} from '../../types/navigation';
import {colors, spacing, fontSize} from '../../constants/theme';

type Props = NativeStackScreenProps<MyPageStackParamList, 'Notification'>;

const SWITCH_TRACK_COLOR = {false: colors.border, true: colors.primary};

const NotificationScreen: React.FC<Props> = ({navigation}) => {
  const [orderNotification, setOrderNotification] = useState(true);
  const [marketingNotification, setMarketingNotification] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="알림 설정" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>주문 알림</Text>
            <Switch
              value={orderNotification}
              onValueChange={setOrderNotification}
              trackColor={SWITCH_TRACK_COLOR}
              thumbColor={colors.surface}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>마케팅 알림</Text>
            <Switch
              value={marketingNotification}
              onValueChange={setMarketingNotification}
              trackColor={SWITCH_TRACK_COLOR}
              thumbColor={colors.surface}
            />
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingLabel: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});

export default NotificationScreen;
