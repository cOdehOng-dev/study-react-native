/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AuthApp from './src/components/AuthApp';
import TodoApp from './src/components/TodoApp';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PostsApp from './src/components/PostsApp';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <PostsApp />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
