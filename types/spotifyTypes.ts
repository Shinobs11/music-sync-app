import {DeepPartial} from '../utils/DeepPartial';

/*
tbh most, if not all of this is going to be moved to the backend when I get started on that so 🤷 if stuff doesn't quite work how I want it to. 
*/
/**
 * More stuff I learned today
 * - Namespace can be used to group interfaces together for exporting as default
 */
namespace SpotifyTypes {
    export interface ErrorResponse {
        error: {
            status: number,
            message: string
        }
    }

    export interface UserTopItemsResponse {
        href: string,
        items: DeepPartial<{ //Using DeepPartial because I genuinely have no idea how spotify's response shape is going to be.
            album: {
                album_type: string,
                artists: {
                    external_urls: {
                        spotify: string
                    },
                    href: string,
                    id: string,
                    name: string,
                    type: string,
                    uri: string

                }[]
            },
            available_markets: string[],
            external_urls:{
                spotify: string
            },
            href: string,
            id: string,
            images:{
                height: number,
                url: string,
                width: number
            }[]
        }>[],
        limit: number,
        next: string | null,
        offset: number,
        previous: string | null,
        total: number
    }
}
export default SpotifyTypes;