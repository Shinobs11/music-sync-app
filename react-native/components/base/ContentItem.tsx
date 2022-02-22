/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useTheme} from '@react-navigation/native'
import {StyleSheet, Image,  View, Pressable, Text} from 'react-native';

import customTypes from '../../types/CustomTypes';

//todos: need to make a content item with an image to left and text to right
//todos: research caching images on react-native
export interface ContentItemProps{
    
    itemData: customTypes.AlbumContentItem |customTypes.ArtistContentItem | customTypes.TrackContentItem | customTypes.PlaylistContentItem,
    contentShape: string,
    imageShape: string,
    contentName: string,
    contentOwner?: string,
    image?: string,
    nav?: ()=>void
}

const ContentItem = (props:ContentItemProps) => {
    const { dark, colors } = useTheme();
    
    const s = StyleSheet.create({
        container:{
            paddingHorizontal: 15,
            paddingVertical: 10,
            height:100,
            display:"flex",
            flexDirection:"row",
            
        },
        textContainer:{
        },
        image:{
            height: "100%",
            width: 100,    
        },
        nameText:{
            fontSize:14,
            color: colors.text
        },
        ownerText:{
            fontSize:14,
            color:colors.text
        }
    })
    
    const Container = ({children}:{children:React.ReactNode}) =>{
        if(props.contentShape == "bar"){
        return(
            // <Box w={"100%"} h={"40"} style={s.container}>
                <View style={s.container} >
                    {children}
                </View>
            // </Box>
        )
        }
        else{
            return(
                <View style={s.container}>
                    <View >
                        {children}
                    </View>
                </View>
            )
        }
    }
    const ContentText = ()=>{
        if(props.contentOwner != undefined){
            return(
                <View style={s.textContainer} >
                <View >
                    <Text style={s.nameText}>
                        {props.contentName}
                    </Text>
                    <Text style={s.ownerText}>
                        {props.contentOwner}
                    </Text>
                </View>
                </View>
            )
        }
        else{
            return(
                <View style={s.textContainer}>
            <Text style={s.nameText}>
                {props.contentName}
            </Text>
            </View>
            )
        }
    }



    
    return (
        <Pressable onPress={props.nav}>
            <Container>
                <Image source={{uri: props.image}}
                // height={40}
                // width={40}
                style={s.image}
                resizeMode={"contain"}
                />
                
                <ContentText/>
            </Container>
        </Pressable>
    )
}



export default ContentItem;






