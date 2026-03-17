/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootStack from './src/screens/RootStack';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} />
      <UserContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </UserContextProvider>
    </SafeAreaView>
  );
}

export default App;
