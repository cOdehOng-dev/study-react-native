/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <RootStack />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
