import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { AuthProvider } from './src/app/providers';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#303F9F',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
