import React, { useEffect } from 'react';
import { View, Platform, Button } from 'react-native';
import { SpotifySession, remote, ContentItem} from 'react-native-spotify-remote';
import { NonSerializedTokenResponse } from '../../../../types/authTypes';
import axios, { AxiosRequestConfig,  AxiosResponse } from 'axios';
import SpotifyTypes from '../../../../types/spotifyTypes';
function SpotifyPlayer(props: any) {

    const authObject: NonSerializedTokenResponse = props.authObject;

    const sessConfig = (): SpotifySession => {
        const expiration = (authObject.expiresIn.valueOf() + authObject.issuedAt.valueOf());
        return ({
            accessToken: authObject.accessToken,
            expirationDate: expiration.toString(),
            expired: ((new Date).getTime() > expiration),
            refreshToken: authObject.refreshToken,
            //TODOs: ios only scopes field
        } as SpotifySession)
        }

        /**
         * Things I've learned today:
         * - I need to include "Bearer " + accessToken in the same field.
         * - I can exclude fields that are default in the data section
         * - Axios automatically sends request as json, I don't need to specify.
         * - Axios has types that available to import
         */

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
                const data:SpotifyTypes.UserTopItemsResponse = res.data;
                console.log(typeof data);
                return data;
            }
            catch (e) {
                throw e;
            }
            

        }
        
        const connectToSpotify = async () =>{
            try{
                const track:SpotifyTypes.UserTopItemsResponse = await getTracks();
                // const item:ContentItem = {

                // }
                await remote.connect(authObject.accessToken);
            }
            catch(e){
                console.warn(e);
            }
        }


    return (
        <>
            <Button onPress={() => { getTracks() }} title="Get tracks" />
        </>
    )



}



export default SpotifyPlayer;




