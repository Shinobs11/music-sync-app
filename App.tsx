import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from './react-native/redux/store';
import useCachedResources from './react-native/hooks/useCachedResources';
import useColorScheme from './react-native/hooks/useColorScheme';
import Navigation from './react-native/navigation';


export default function App() {
    
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <Provider store={store}>
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
        </SafeAreaProvider>
    </Provider>
    );
  }
}
