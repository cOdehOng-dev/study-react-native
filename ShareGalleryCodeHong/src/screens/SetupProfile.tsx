import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackScreenProps } from './RootStack';
import { createUser } from '../../libs/users';
import { signOut } from '../../libs/auth';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import { useUserContext } from '../../contexts/UserContext';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation<RootStackNavigationProp>();
  const { setUser } = useUserContext();
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);

  const { params } = useRoute<RootStackScreenProps<'Welcome'>['route']>();
  const { uid } = params;
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let photoUrl = null;
    if (response) {
      const asset = response.assets?.[0];
      const extension = asset?.fileName?.split('.').pop(); // 확장자 추출
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        await reference.putString(asset?.base64 ?? '', 'base64', {
          contentType: asset?.type,
        });
      } else {
        await reference.putFile(asset?.uri ?? '');
      }

      photoUrl = response ? await reference.getDownloadURL() : null;
    }

    const user = {
      id: uid,
      displayName,
      photoUrl,
    };
    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onselectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxHeight: 512,
        maxWidth: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onselectImage}>
        <Image
          style={styles.circle}
          source={
            response
              ? { uri: response?.assets?.[0]?.uri }
              : require('../../assets/user.png')
          }
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
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
  spinner: {
    marginTop: 48,
    height: 104,
  },
});

export default SetupProfile;
