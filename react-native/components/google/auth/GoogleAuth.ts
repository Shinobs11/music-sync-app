import { authorize, refresh, revoke, prefetchConfiguration, AuthorizeResult } from "react-native-app-auth";
import { GoogleSession } from '../../../types/AuthTypes';



const config = {
    issuer: 'https://accounts.google.com',
    clientId: 'GOOGLE_OAUTH_APP_GUID.apps.googleusercontent.com',
    redirectUrl: 'com.googleusercontent.apps.GOOGLE_OAUTH_APP_GUID:/oauth2redirect/google',
    scopes: ['openid', 'profile']
};
prefetchConfiguration(config);



  
  // Log in to get an authentication token
const googleAuthFlow = async ():Promise<GoogleSession>=>{
    const res:AuthorizeResult = await authorize(config);
    return {
        accessToken:res.accessToken,
        refreshToken: res.refreshToken,
        expirationDate: (new Date(res.accessTokenExpirationDate)).getTime(),
        scope: res.scopes,
        tokenType:res.tokenType
    }

}
  
  // Refresh token
const googleRefreshFlow = async (refreshToken: string)=>{
    return await refresh(config, {
        refreshToken: refreshToken
      });
}
  
export {googleAuthFlow, googleRefreshFlow}