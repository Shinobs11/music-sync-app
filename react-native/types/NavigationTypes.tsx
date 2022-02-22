/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import customTypes from './CustomTypes';
import { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams, CompositeNavigationProp, ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContentScreens } from '../constants/ContentConstants';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}



export interface PlaylistScreenRouteParams extends customTypes.CommonContentProperties {}
// export interface PlaylistListScreenRouteParams extends customTypes.CommonContentProperties {}

export type RootStackParamList = {
  [index: string]: any
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
  album: undefined;
  artist: undefined;
  playlist: PlaylistScreenRouteParams;
  playlistList: undefined; // actually not sure yet how I'm going to handle this, so no params
    devTestScreen: undefined;
};


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Library: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;




