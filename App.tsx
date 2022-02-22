import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from './react-native/redux/store';
import useCachedResources from './react-native/hooks/useCachedResources';
import useColorScheme from './react-native/hooks/useColorScheme';
import Navigation from './react-native/navigation';
import { useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';

export default function App() {
    
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = (colorScheme === 'dark') ? DarkTheme : DefaultTheme
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <Provider store={store}>
        <SafeAreaProvider>
        <StatusBar backgroundColor={Platform.OS == 'android' ? theme.colors.background: undefined }  />
            <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
    </Provider>
    );
  }
}
