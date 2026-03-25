import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { RootStackNavigationProp, RootStackScreenProps } from './RootStack';
import IconRightButton from '../components/IconRightButton';

function UploadScreen() {
  const route = useRoute<RootStackScreenProps<'Upload'>['route']>();
  const { res } = route.params || {};
  const { width } = useWindowDimensions(); // 화면 너비 가져오기
  const animation = useRef(new Animated.Value(width)).current; // 초기 위치를 화면 너비로 설정
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');

  const navigation = useNavigation<RootStackNavigationProp>();
  const onSubmit = useCallback(() => {
    // TODO: 게시물 업로드 로직 구현
  }, []);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width, // 키보드가 열리면 0, 닫히면 화면 너비로 이동
      useNativeDriver: false,
      duration: 300,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <View style={styles.block}>
      <Animated.Image
        source={{ uri: res.assets?.[0]?.uri }}
        style={[styles.image, { height: animation }]} // 1:1 비율 고정
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );
}

export default UploadScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});
