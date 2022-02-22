import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {useTheme} from "@react-navigation/native";
import ContentList from '../components/ContentList'
import AppBar from '../components/AppBar';
import playlistListData from '../../test-data/playlists.json'
import { ContentScreens, ContentTypes } from '../constants/ContentConstants';
import { RootStackScreenProps, RootStackParamList } from '../types/NavigationTypes';
import PlaylistList from '../components/ContentList';
const PlaylistListScreen =({route, navigation}:RootStackScreenProps<keyof RootStackParamList["playlistList"]>)=>{
    const {colors, dark} = useTheme();
    const s = StyleSheet.create({
        topContainer:{
            width:"100%",
            height:"100%"
        }
    })
    const passableData = playlistListData.items
return(
    <View style={s.topContainer}>
        <AppBar headerText='Playlists'/>
        <ContentList
        data={passableData}
        type={ContentTypes.playlist}
        listShape={"bar"}
        />
    </View>
)
}

export default PlaylistListScreen