import React, { useEffect } from 'react';
import { View, Platform, Button } from 'react-native';
import { SpotifySession, remote, ContentItem} from 'react-native-spotify-remote';

import axios, { AxiosRequestConfig,  AxiosResponse } from 'axios';
import { SessionEnum } from '../../../../constants/Auth';
import { SpotifyWebSession } from '../../../../types/AuthTypes';
function SpotifyPlayer(props: any) {
    const authObject: SpotifyWebSession = props.authObject[SessionEnum.spotifyWebSession];

    

        const getTracks = async () => {
            try {
                const spotify_url = 'https://api.spotify.com/v1/me/top/tracks';
                const config: AxiosRequestConfig = {
                    method: 'get',
                    data: {
                        limit: 1
                    },
                    headers: {
                        Authorization: "Bearer " + authObject.accessToken,
                    }
                }
                const res:AxiosResponse = (await axios(spotify_url, config))
                const data:SpotifyApi.TrackObjectSimplified = res.data;
                console.log(typeof data);
                return data;
            }
            catch (e) {
                throw e;
            }
            

        }
        
        const connectToSpotify = async () =>{
            try{
                const track:SpotifyApi.TrackObjectSimplified = await getTracks();
                // const item:ContentItem = {

                // }
                await remote.connect(authObject.accessToken);
                await remote.playUri(track.uri);
            }
            catch(e){
                console.warn(e);
            }
        }


    return (
        <>
            <Button onPress={() => { connectToSpotify() }} title="Play music" />
        </>
    )



}



export default SpotifyPlayer;




