import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import store from './react-native/redux/store';
import useCachedResources from './react-native/hooks/useCachedResources';
import useColorScheme from './react-native/hooks/useColorScheme';
import Navigation from './react-native/navigation';
import { useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import hydrateState from './react-native/redux/hydrateState';
import { SessionObjectState } from './react-native/types/AuthTypes';
import {instantiateState, AuthState} from './react-native/redux/DUCKS/auth-duck'
export default function App() {
    
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [initState, setInitState] = useState(instantiateState<AuthState>())
  const theme = (colorScheme === 'dark') ? DarkTheme : DefaultTheme
  //!!!! Can't really progress until I figure out how to initialize state outside of react, maybe in index.js???
  useEffect(()=>{
    async ()=>{
        setInitState(await hydrateState())
    }
  })

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
