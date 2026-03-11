/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import AppDev from './AppDev';
import { name as appName } from './app.json';
import SettingScreen from './src/SettingScreen';

if (__DEV__) {
  AppRegistry.registerComponent(appName, () => AppDev);
} else {
  AppRegistry.registerComponent(appName, () => App);
}

AppRegistry.registerComponent('SettingScreen', () => SettingScreen);
