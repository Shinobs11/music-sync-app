
import { Platform } from 'react-native';
import {
    AuthRequest,
    AuthRequestPromptOptions,
    AuthSessionResult,
    exchangeCodeAsync,
    fetchDiscoveryAsync,
    DiscoveryDocument,
    loadAsync,
    AuthRequestConfig,
    TokenResponse,
    AccessTokenRequestConfig,
    ResponseType
} from "expo-auth-session";
import { polyfillWebCrypto } from 'expo-standard-web-crypto';

polyfillWebCrypto();


//TODO: Generally ill-advised to hardcode client-id, remove later.
const CLIENT_ID = "cf9eb20ddb254f6092c24e80d37317f3"
//TODO: extremely ill-advised to hardcode client-secret, for the love of god remove later.
const CLIENT_SECRET = "9b75f8b08c7f4919857e757de193a24f"
//TODO: Would like to get a dedicated server for this, I'm not sure how I'll get this to work at school tho.




const REDIRECT_URI = "music-sync://spotify-redirect"
const TOKEN_REFRESH_URI = "music-sync://spotify-refresh"
const TOKEN_SWAP_URI = "music-sync://spotify-swap"


const generateRandomString = (n: number) => {
    var arr: String[] = []
    crypto.getRandomValues(new Uint8Array(n)).forEach(x => arr.push(x.toString(n)))
    return arr.join('');
}


export const SCOPES = [
    "app-remote-control", // maybe comment out if it interferes
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-read-private",
    "streaming",
    "user-follow-read",
    "user-library-read",
    "user-library-modify",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-read-private",
    "user-read-recently-played",
    "user-top-read"
]





const codeRequestConfig =  ():AuthRequestConfig => {
    return({
        responseType: ResponseType.Code,
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI,
        scopes: SCOPES,
        //I shoudln't need client secret here
        //codeChallengeMethod is default s256,
        state: generateRandomString(16),
        //pkce is default enabled
        //
    })
}





const accessTokenRequestConfig = (promptRes: PromptResult, authReq:AuthRequest ):AccessTokenRequestConfig =>{
    const codeVerifierExists = (codeVerifier:string|undefined):string =>{
        if(typeof codeVerifier === "string"){
            return codeVerifier;
        }
        else{
            console.warn("Code Verifier does not exist, authentication can't proceed.");
            return "";
        }
    }
    return ({
        code:promptRes.params.code,
        redirectUri: authReq.redirectUri,
        clientId: authReq.clientId,
        clientSecret: CLIENT_SECRET,
        extraParams:{
            "code_verifier": codeVerifierExists(authReq.codeVerifier)
        }
    })
}

const promptOptions = ():AuthRequestPromptOptions =>{
    const opt = {
        //useProxy might be needed if doesn't work locally,
    }
    if(Platform.OS === 'android'){
        return {...opt, showInRecents: true}
    }
    return opt;
}

interface SpotifyCodeParams {
    code: string, //if successful, will have code
    state: string,
}

interface PromptResult {
    params: SpotifyCodeParams,
    url: string
}

const handlePrompt = (loginRes:AuthSessionResult):PromptResult | undefined =>{
    switch(loginRes.type){
        case "success":
            if(loginRes.params["code"]){
            return {
                params: {
                    "code": loginRes.params["code"],
                    "state": loginRes.params["state"]
                },
                url: loginRes.url
            }
        }
        else{
            console.error(loginRes.params["error"]);
        }   

            break;    
        case "dismiss":
            //is there any case in which I dismiss the prompt manually?
            break;
        case "cancel":
            //TODOS:Figure out what to do if user closes browser
            break;
        case "locked":
            //not sure what to put here
            break;
        case "error":
            if(loginRes.error){
                console.error(loginRes.error);
            }
            else{
                console.error("Returns error type, but has no error");
            }
            break;
        default:
            console.error("Case should not be reachable");
            break;
    }
}

const authFlow = async (): Promise<TokenResponse|undefined> =>{
    try{
    // Fetch discovery document for OpenID Connect
    const discoveryDocument:DiscoveryDocument = await fetchDiscoveryAsync("https://accounts.spotify.com");
    // Constructs AuthRequest instance
    const authReq:AuthRequest = await loadAsync(codeRequestConfig(), discoveryDocument);
    // Prompts user for login and returns an AuthSessionResult

    const promptRes:PromptResult|undefined = handlePrompt(await authReq.promptAsync(discoveryDocument, promptOptions()));
    console.log(promptRes)
    if(promptRes === undefined){
        return; // bleh
    }
    //Exchanges code for access token.
    console.log("entering exchange code");
    
    const tokenRes:TokenResponse = await exchangeCodeAsync(accessTokenRequestConfig(promptRes, authReq), discoveryDocument);
    return tokenRes;
    }
    catch(e){
        console.warn(e);
    }
}


export { authFlow };



