import { StyleSheet } from 'react-native';

import { Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types/NavigationTypes';
import SpotifyContainer from '../components/music-platforms/spotify/SpotifyContainer';
export default function DevTestScreen({ navigation }: RootStackScreenProps<'devTestScreen'>) {
    
  return (
    <View style={styles.container}>
      <SpotifyContainer/>
      {/* <Button onPress={()=>{alert("hello")}} title='hello' /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
