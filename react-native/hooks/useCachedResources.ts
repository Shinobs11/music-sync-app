import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { getAuthFromSecureStore } from '../redux/DUCKS/auth-duck';
import store from '../redux/store';



export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        // await Font.loadAsync({
        //   ...FontAwesome.font,
        //   'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        // });
        //grab key from SecureStore(Coule be used for sessions and for authentication)
    
        store.dispatch(getAuthFromSecureStore());
        
        


      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
