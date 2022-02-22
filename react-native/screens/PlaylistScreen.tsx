/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Animated, Platform, StyleSheet } from 'react-native';
import { RootStackScreenProps, PlaylistScreenRouteParams } from '../types/NavigationTypes';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useRef } from 'react';
import AppBar from '../components/AppBar';
import ContentList from '../components/ContentList';
import lizziePlaylistItems from '../../test-data/lizziePlaylistItems.json'
import customTypes from '../types/CustomTypes';
import { ContentTypes } from '../constants/ContentConstants';
export default function PlaylistScreen({navigation, route}:RootStackScreenProps<"playlist">) {

    const scrollY = useRef(new Animated.Value(0));
    const data = lizziePlaylistItems as customTypes.PagingObject<customTypes.PlaylistTrackObject>
    const playlistItems = data.items.map((x)=>x.track) as customTypes.TrackObjectFull[];
  return (
    <View
    style={styles.container}
    >
        {/* <Example/> */}
        <AppBar scrollPos={scrollY} headerText={"Lizzie + Shino"}/>
        <ContentList 
        scrollY={scrollY} 
        type={ContentTypes.track}
        data={playlistItems}
        headerData={{
            images: route.params.images,
            name: route.params.name,
            owner: route.params.owner,
            type: route.params.type
        }}
        listShape={"bar"}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
