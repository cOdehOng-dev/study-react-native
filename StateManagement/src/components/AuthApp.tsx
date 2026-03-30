import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../CommonStyles';
import AuthStatus from './AuthStatus';
import AuthButtons from './AuthButtons';

function AuthApp() {
  return (
    <SafeAreaView style={commonStyles.block}>
      <AuthStatus />
      <AuthButtons />
    </SafeAreaView>
  );
}

export default AuthApp;

const styles = StyleSheet.create({});
