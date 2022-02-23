/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {ContentScreens} from '../constants/ContentConstants'
import { RootStackParamList } from '../types/NavigationTypes';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["music-sync://", "music-sync-auth://"],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Library: {
            screens: {
              LibraryScreen: 'library',
            },
          },
        },
      },
      NotFound: '*',
      [ContentScreens.playlist]: ContentScreens.playlist,
      [ContentScreens.album]: ContentScreens.album,
      [ContentScreens.artist]: ContentScreens.artist,
      [ContentScreens.playlistList]: ContentScreens.playlistList,
      [ContentScreens.devTestScreen]: ContentScreens.devTestScreen
    },
  },
};

export default linking;
