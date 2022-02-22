import { Pressable, StyleSheet } from 'react-native';
import AppBar from '../components/AppBar';
import { View, Text } from 'react-native';
import ContentHeader from '../components/base/ContentHeader';
import customTypes from '../types/CustomTypes';
import { RootTabScreenProps } from '../types/NavigationTypes';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ReactElement } from 'react';



//album - MaterialIcons
//person-circle - MaterialIcons - Use this for profile page?
//account-music / account-music-outline - MaterialCommunityIcons - Use this for Artists?
//queue-music - MaterialIcons - use for queue
// music-box-multiple - MaterialCommunityIcons - use this for playlists
//heart or heart-multiple for liked songs - MaterialCommunityIcons
//chevron-right
export default function LibraryScreen({ navigation, route }: RootTabScreenProps<"Library">) {
    const { colors, dark } = useTheme();
    
    const styles = StyleSheet.create({
        container: {
            
            height: "100%",
            width: "100%",
    
        },
        containerOfTextBars: {
            width:"100%",
            height:250,
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-around"
        },

        textBarContainer: {
            
            width: "100%",
            // height: 40,
            paddingHorizontal:15,
            justifyContent:"space-between",
            flexDirection:"row"
        },
        textIconContainer:{
            flexDirection:"row",
        },
        textBarText: {
            fontSize: 24,
            color: colors.text,
            fontWeight:"bold",
            paddingLeft: 14
        }
    });

    
    const TextBar = ({ name, iconName, iconSet }: { name: string, iconName: string, iconSet:string }) => {
        const Icon = ()=>{
            //interesting... thank you Paolo Vincent on stackoverflow
            if (iconSet === "MaterialIcons"){
                type MatIconType = React.ComponentProps<typeof MaterialIcons>['name'] 
                return(
                    <MaterialIcons name={iconName as MatIconType} size={30} color={colors.text} />
                )
            }
            else{
            type MatComIconType = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
            return(
                <MaterialCommunityIcons name={iconName as MatComIconType} size={30} color={colors.text} />
            )
            }
        }
        return (
            <View style={styles.textBarContainer}>
                <View style={styles.textIconContainer}>
                <Icon />
                <Text style={styles.textBarText}>
                    {name}
                </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={40} color={colors.text}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <AppBar />
            <View style={styles.containerOfTextBars}>
            <Pressable onPress={()=>{navigation.navigate("playlistList")}}>
            <TextBar
                iconName={"music-box-multiple"}
                iconSet={"MaterialCommunityIcons"}
                name={"Playlists"} />
            </Pressable>
            <TextBar
                iconName={"account-music"}
                iconSet={"MaterialCommunityIcons"}
                name={"Artists"} />
            <TextBar
                iconName={"album"}
                iconSet={"MaterialIcons"}
                name={"Albums"} />
            <TextBar
                iconName={"clock-time-three-outline"}
                iconSet={"MaterialCommunityIcons"}
                name={"Recently Played"} />
            <TextBar
                iconName={"heart"}
                iconSet={"MaterialCommunityIcons"}
                name={"Liked Songs"} />
            </View>
        </View>
    );
}

