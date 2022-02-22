



declare namespace customTypes{



/**
 * !SUPPORT TYPES
 * 
 */
export interface RestrictionsObject {
    reason: string;
}
/**
     * External Id object
     * [](https://developer.spotify.com/web-api/object-model/)
     *
     * Note that there might be other types available, it couldn't be found in the docs.
     */
export interface ExternalIdObject {
    isrc?: string | undefined;
    ean?: string | undefined;
    upc?: string | undefined;
}

export interface ExternalUrlObject {
    spotify: string;
}
export interface FollowersObject {
        /**
         * A link to the Web API endpoint providing full details of the followers; `null` if not available.
         * Please note that this will always be set to `null`, as the Web API does not support it at the moment.
         */
        href: null;
        /**
         * The total number of followers.
         */
        total: number;
}




export interface UserObjectPublic {
    display_name?: string | undefined;
    external_urls: ExternalUrlObject;
    followers?: FollowersObject | undefined;
    href: string;
    id: string;
    images?: ImageObject[] | undefined;
    type: string;
    uri: string;
}
export interface ImageObject {
    /**
     * The image height in pixels. If unknown: `null` or not returned.
     */
    height?: number | undefined | null;
    /**
     * The source URL of the image.
     */
    url: string;
    /**
     * The image width in pixels. If unknown: null or not returned.
     */
    width?: number | undefined | null;
}

export interface PagingObject<T> {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface ContextObject {
    /**
     * The object type.
     */


    type: string
    /**
     * A link to the Web API endpoint providing full details.
     */
    href: string;
    /**
     * Known external URLs.
     */
    external_urls: ExternalUrlObject;
    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
     */
    uri: string;
}
export interface PlaylistTrackObject {
    added_at: string;
    added_by: UserObjectPublic;
    is_local: boolean;
    track: TrackObjectFull;
}
export interface PlaylistObjectFull extends PlaylistBaseObject {
    /**
     * Information about the followers of the playlist.
     */
    followers: FollowersObject;
    /**
     * Information about the tracks of the playlist.
     */
    tracks: PagingObject<PlaylistTrackObject>;
}
export interface PlaylistBaseObject extends ContextObject {
    /**
     * Returns `true` if context is not search and the owner allows other users to modify the playlist.
     * Otherwise returns `false`.
     */
    collaborative: boolean;
    /**
     * The playlist description. Only returned for modified, verified playlists, otherwise null.
     */
    description: string | null;
    /**
     * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
     */
    id: string;
    /**
     * Images for the playlist. The array may be empty or contain up to three images.
     * The images are returned by size in descending order.
     * See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
     * Note: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day.
     */
    images: ImageObject[];
    /**
     * The name of the playlist.
     */
    name: string;
    /**
     * The user who owns the playlist.
     */
    owner: UserObjectPublic;
    /**
     * The playlist’s public/private status:
     * `true` the playlist is public,
     * `false` the playlist is private,
     * or `null` the playlist status is not relevant.
     */
    public: boolean | null;
    /**
     * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version:
     * see [Remove tracks from a playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/).
     */
    snapshot_id: string;
    // type: Pick<ContentTypes, "playlist">;
}

export interface PlaylistObjectSimplified extends PlaylistBaseObject {
    tracks: {
        href: string;
        total: number;
    };
}

export interface PagingObject<T> {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface ListOfCurrentUsersPlaylistsResponse extends PagingObject<PlaylistObjectSimplified> {}

/**
 * !ARTIST TYPES
 */
 export interface ArtistObjectFull extends ArtistObjectSimplified {
    /**
     * Information about the followers of the artist.
     */
    followers: FollowersObject;
    /**
     * A list of the genres the artist is associated with.
     * For example: `"Prog Rock"` , `"Post-Grunge"`.
     * (If not yet classified, the array is empty.)
     */
    genres: string[];
    /**
     * Images of the artist in various sizes, widest first.
     */
    images: ImageObject[];
    /**
     * The popularity of the artist. The value will be between `0` and `100`, with `100` being the most popular.
     * The artist’s popularity is calculated from the popularity of all the artist’s tracks.
     */
    popularity: number;
}

/**
 * Simplified Artist Object
 * [artist object (simplified)](https://developer.spotify.com/web-api/object-model/)
 */
export interface ArtistObjectSimplified extends ContextObject {
    /**
     * The name of the artist.
     */
    name: string;
    /**
     * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
     */
    id: string;
    type: "artist";
}



/**
 * !ALBUM TYPES
 */
 export interface AlbumObjectSimplified extends ContextObject {
    /**
     * The field is present when getting an artist’s albums.
     * Possible values are “album”, “single”, “compilation”, “appears_on”.
     * Compare to album_type this field represents relationship between the artist and the album.
     */
    album_group?: "album" | "single" | "compilation" | "appears_on" | undefined;
    /**
     * The type of the album: one of “album”, “single”, or “compilation”.
     */
    album_type: "album" | "single" | "compilation";
    /**
     * The artists of the album.
     * Each artist object includes a link in href to more detailed information about the artist.
     */
    artists: ArtistObjectSimplified[];
    /**
     * The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
     * Note that an album is considered available in a market when at least 1 of its tracks is available in that market.
     */
    available_markets?: string[] | undefined;
    /**
     * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the album.
     */
    id: string;
    /**
     * The cover art for the album in various sizes, widest first.
     */
    images: ImageObject[];
    /**
     * The name of the album. In case of an album takedown, the value may be an empty string.
     */
    name: string;
    /**
     * The date the album was first released, for example `1981`.
     * Depending on the precision, it might be shown as `1981-12` or `1981-12-15`.
     */
    release_date: string;
    /**
     * The precision with which release_date value is known: `year`, `month`, or `day`.
     */
    release_date_precision: "year" | "month" | "day";
    /**
     * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
     * the original track is not available in the given market, and Spotify did not have any tracks to relink it with.
     * The track response will still contain metadata for the original track,
     * and a restrictions object containing the reason why the track is not available: `"restrictions" : {"reason" : "market"}`
     */
    restrictions?: RestrictionsObject | undefined;
    type: "album";
    /**
     * The number of tracks in the album.
     */
    total_tracks: number;
}
interface CopyrightObject {
    text: string;
    type: "C" | "P";
}

export interface AlbumObjectFull extends AlbumObjectSimplified {
    /**
     * The copyright statements of the album.
     */
    copyrights: CopyrightObject[];
    /**
     * Known external IDs for the album.
     */
    external_ids: ExternalIdObject;
    /**
     * A list of the genres used to classify the album.
     * For example: `"Prog Rock"` , `"Post-Grunge"`. (If not yet classified, the array is empty.)
     */
    genres: string[];
    /**
     * The label for the album.
     */
    label: string,
    /**
     * The popularity of the album. The value will be between `0` and `100`, with `100` being the most popular.
     * The popularity is calculated from the popularity of the album’s individual tracks;
     */
    popularity: number;
    /**
     * The tracks of the album.
     */
    tracks: PagingObject<TrackObjectSimplified>;
}

/**
 * !TRACK TYPES
 */

export interface TrackLinkObject {
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    type: "track";
    uri: string;
}


export interface TrackObjectFull extends TrackObjectSimplified {
    /**
     * The album on which the track appears.
     */
    album: AlbumObjectSimplified;
    /**
     * Known external IDs for the track.
     */
    external_ids: ExternalIdObject;
    /**
     * The popularity of the track. The value will be between `0` and `100`, with `100` being the most popular.
     * The popularity of a track is a value between `0` and `100`, with `100` being the most popular.
     * The popularity is calculated by algorithm and is based, in the most part,
     * on the total number of plays the track has had and how recent those plays are.
     */
    popularity: number;
    /**
     * Whether or not the track is from a local file.
     */
    is_local?: boolean | undefined;
}

/**
 * Simplified Track Object
 * [track object (simplified)](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
export interface TrackObjectSimplified {
    /**
     * The artists who performed the track.
     */
    artists: ArtistObjectSimplified[];
    /**
     * A list of the countries in which the track can be played,
     * identified by their [ISO 3166-1 alpha-2 code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
     */
    available_markets?: string[] | undefined;
    /**
     * The disc number (usually `1` unless the album consists of more than one disc).
     */
    disc_number: number;
    /**
     * The track length in milliseconds.
     */
    duration_ms: number;
    /**
     * Whether or not the track has explicit lyrics (`true` = yes it does; `false` = no it does not OR unknown).
     */
    explicit: boolean;
    /**
     * Known external URLs for this track.
     */
    external_urls: ExternalUrlObject;
    /**
     * A link to the Web API endpoint providing full details of the track.
     */
    href: string;
    /**
     * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
     */
    id: string;
    /**
     * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied.
     * If `true`, the track is playable in the given market. Otherwise, `false`.
     */
    is_playable?: boolean | undefined;
    /**
     * Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied,
     * and the requested track has been replaced with different track.
     * The track in the `linked_from` object contains information about the originally requested track.
     */
    linked_from?: TrackLinkObject | undefined;

    restrictions?: RestrictionsObject | undefined;
    /**
     * The name of the track.
     */
    name: string;
    /**
     * A link to a 30 second preview (MP3 format) of the track. Can be null
     */
    preview_url: string | null;
    /**
     * The number of the track. If an album has several discs, the track number is the number on the specified disc.
     */
    track_number: number;
    /**
     * The object type: “track”.
     */
    type: "track";
    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
     */
    uri: string;
}


/**
 * !???
 */

export interface CommonContentProperties{
    [index:string]: any
    id: string,
    type: string,
    name: string,
    href: string,
    external_url: ExternalUrlObject,
    uri: string,
    images: ImageObject[]
}


// //TODOS: Make sure that we request full data upon entering object
export type ContentListResponseData = PlaylistObjectSimplified | PlaylistObjectFull| AlbumObjectSimplified | AlbumObjectFull | ArtistObjectFull


export type AlbumContentItem = {

    artists: ArtistObjectSimplified[],
    id: string,
    images: ImageObject[],
    name: string,
    release_date: string,
    total_tracks: number,
    type: string,
}

export type PlaylistContentItem = {
        collaborative: boolean,
        description: string | null,
        id: string,
        images: ImageObject[],
        name: string,
        owner:  UserObjectPublic ,
        public: boolean|null,
        tracks: {
            href: string,
            total: number
        },
        type:string,
}

export type ArtistContentItem = {
        name: string,
        id: string,
        followers: FollowersObject,
        genres: string[],
        popularity: number,
        images: ImageObject[],
        type: string,
    }

export type TrackContentItem = {
        artists: ArtistObjectSimplified[],
        duration_ms: number,
        explicit: boolean,
        data: ExternalUrlObject,
        href: string,
        id: string,
        //is_playable
        name: string,
        track_number: number,
        type: string
        
}
}

export default customTypes;