/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, View, Animated } from 'react-native';


import { Text } from '../components/Themed';
import testPlaylistData from '../../test-data/playlists.json'
import { RootTabScreenProps } from '../types/NavigationTypes';

import AppBar from '../components/AppBar';
import ContentItem from '../components/base/ContentItem'
import ContentList from '../components/ContentList'
import {useRef} from 'react';
import ContentHeader from '../components/base/ContentHeader';
import customTypes from '../types/CustomTypes';

function HomeScreen(props: RootTabScreenProps<any>) {
    const scrollY = useRef(new Animated.Value(0));
    const data = testPlaylistData.items as  customTypes.ListOfCurrentUsersPlaylistsResponse["items"];
    
    //TODO: create const object enum thing for list types so i don't have to worry about misspelling
  return (
    <View
    style={styles.container}
    >
        <AppBar/>
        <ContentList type="playlist" listShape="bar" scrollY={scrollY} data={data}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});
export default HomeScreen