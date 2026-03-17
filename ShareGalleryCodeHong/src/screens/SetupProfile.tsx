import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackScreenProps } from './RootStack';
import { createUser } from '../../libs/users';
import { signOut } from '../../libs/auth';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import { useUserContext } from '../../contexts/UserContext';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation<RootStackNavigationProp>();
  const { setUser } = useUserContext();

  const { params } = useRoute<RootStackScreenProps<'Welcome'>['route']>();
  const { uid } = params;

  const onSubmit = () => {
    const user = {
      id: uid,
      displayName,
      photoUrl: null,
    };
    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View style={styles.circle} />
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
          <CustomButton title="취소" onPress={onCancel} theme="secondary" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
