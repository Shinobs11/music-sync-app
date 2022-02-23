/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import DevTestScreen from '../screens/DevTestScreen';
import { ContentScreens, ContentTypes } from '../constants/ContentConstants';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types/NavigationTypes';
import LinkingConfiguration from './LinkingConfiguration';
import PlaylistScreen from '../screens/PlaylistScreen';
import PlaylistListScreen from '../screens/PlaylistListScreen';
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
       {/* <Stack.Screen name={ContentTypes.album} component={AlbumScreen}/>
      <Stack.Screen name={ContentTypes.artist} component={ArtistScreen}/> */}
      <Stack.Screen name={ContentScreens.playlist} component={PlaylistScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ContentScreens.playlistList} component={PlaylistListScreen} options={{headerShown:false}}/>
      <Stack.Screen name={ContentScreens.devTestScreen} component={DevTestScreen}/>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();

 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="Home"
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].tint,
       }}>
       <BottomTab.Screen
         name="Home"
         component={HomeScreen}
         options={({ navigation }: RootTabScreenProps<'Home'>) => ({
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
           headerShown: false
         })}
       />
       <BottomTab.Screen
         name="Library"
         component={LibraryScreen}
         options={{
           title: 'Library',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
           headerShown: false
         }}
       />
     </BottomTab.Navigator>
   );
 }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
