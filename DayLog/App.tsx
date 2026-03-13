/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { LogContextProvider } from './src/contexts/LogContext';
import RootStack from './src/screens/RootStack';
import { SearchContextProvider } from './src/contexts/SearchContext';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SearchContextProvider>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}
export default App;
