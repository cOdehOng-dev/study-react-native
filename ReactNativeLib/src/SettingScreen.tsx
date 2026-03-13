import React from 'react';
import { Alert, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PopupHeader from './components/PopupHeader';
const NativeBridgeModule =
  Platform.OS === 'android'
    ? require('./specs/NativeBridgeModule').default
    : null;

const fetchUserInfo = async () => {
  try {
    const result = await NativeBridgeModule.getUserInfoAsync();
    // result = { name: "홍길동", age: 30 }
    Alert.alert('User Info', `Name: ${result.name}, Age: ${result.age}`);
  } catch (e) {
    console.error(e); // promise.reject() 시 여기로
  }
};

function Content() {
  return <View style={styles.content} />;
}

function SettingScreen() {
  const handleClose = () => {
    if (Platform.OS === 'android') {
      NativeBridgeModule?.onClose();
    }
  };

  fetchUserInfo();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <PopupHeader title="설정" onClose={handleClose} />
        <Content />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
  },
});

export default SettingScreen;
