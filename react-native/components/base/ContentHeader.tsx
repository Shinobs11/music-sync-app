import React,{useEffect, useRef} from 'react';
import { StyleSheet,  View, Text, Image, LayoutChangeEvent, Animated, GestureResponderEvent} from 'react-native';
import customTypes from '../../types/CustomTypes';

import {Theme}from '@react-navigation/native';


interface PropsType {
    images: customTypes.ImageObject[],
    name: string,
    owner?: string,
    type: string,
    colorTheme: Theme

}


class ContentHeader extends React.Component<PropsType>{

    constructor(props:PropsType){
        super(props);
        this.state ={
            ref: 0
        }
    }
    
    s = StyleSheet.create({
    topContainer:{
        display: "flex",
        flexDirection: 'row',
        height: 180,
        width: "100%"
    },
    sideContainer:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
        width: "100%"
    },
    image:{
        height: 160,
        width: 160
    },
    imageContainer:{
        paddingHorizontal:12,
        paddingTop:0,
        paddingBottom:10
    },
    nameStyle:{
        flex: 1,
        color: this.props.colorTheme.colors.text,
        fontSize:28,
        fontWeight: 'bold'
    }
})
    
    render(){
        
        return(
    <View
    style={this.s.topContainer}
    >
        <View style={this.s.imageContainer}>
        <Image
        accessibilityLabel={this.props.name}
        style={this.s.image}
        source={{uri:this.props.images[0].url}}
        />
        </View>
        <View style={this.s.sideContainer}>
        <Text 
        selectable
        style={this.s.nameStyle}>
            {this.props.name}
        </Text>
        </View>
    </View>
        )
    }
}




export default ContentHeader;