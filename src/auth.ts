import {OAuth2Client, OAuth2AuthenticateOptions, OAuth2RefreshTokenOptions} from "@byteowls/capacitor-oauth2";
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

// Secure Storage Constants.
const SECURE_STORE_ACCESS_TOKEN = 'SECURE_STORE_ACCESS_TOKEN';
const SECURE_STORE_REFRESH_TOKEN = 'SECURE_STORE_REFRESH_TOKEN';
const SECURE_STORE_EXPIRES_AT = 'SECURE_STORE_EXPIRES_AT';

export default class Auth {

  // Helper Methods

  static getCurrentTimeInSeconds() : number {
    return Math.floor(Date.now() / 1000);
  }

  static getOidcOptions(emailLinkLogin : boolean, idTokenHint : string | null) : OAuth2AuthenticateOptions {

    const policy = emailLinkLogin ? process.env.VUE_APP_AUTH_EMAIL_LINK_SIGNIN_POLICY_NAME : process.env.VUE_APP_AUTH_SIGNIN_POLICY_NAME;

    const authOptions = {
      appId: process.env.VUE_APP_AUTH_CLIENT_ID,
      authorizationBaseUrl: `https://${process.env.VUE_APP_AUTH_TENANT_NAME}.b2clogin.com/${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${policy}/oauth2/v2.0/authorize`,
      scope: `openid offline_access https://${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.VUE_APP_AUTH_CLIENT_ID}/alphavictor`,
      accessTokenEndpoint: `https://${process.env.VUE_APP_AUTH_TENANT_NAME}.b2clogin.com/${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${policy}/oauth2/v2.0/token`,
      responseType: "code",
      pkceEnabled: true,
      logsEnabled: true,
      web: {
          redirectUrl: `${process.env.VUE_APP_BASE_URL}/auth`,
          windowOptions: "height=600,left=0,top=0",
      },
      android: {
          redirectUrl: "msauth://com.mythdigital.alphavictor/lvGC0B4SWYU8tNPHg%2FbdMjQinZQ%3D"
      },
      ios: {
          pkceEnabled: true,
          redirectUrl: "msauth.{package-name}://auth"
      },
      additionalParameters: {}
    };

    if (emailLinkLogin) {
      authOptions.additionalParameters = { "id_token_hint": idTokenHint}
    }

    return authOptions;
  }

  static getOidcRefreshOptions(refreshToken : string) : OAuth2RefreshTokenOptions {

    const policy = process.env.VUE_APP_AUTH_SIGNIN_POLICY_NAME;

    return {
      refreshToken: refreshToken,
      appId: process.env.VUE_APP_AUTH_CLIENT_ID,
      scope: `openid offline_access https://${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.VUE_APP_AUTH_CLIENT_ID}/alphavictor`,
      accessTokenEndpoint: `https://${process.env.VUE_APP_AUTH_TENANT_NAME}.b2clogin.com/${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/B2C_1_SignUpSignIn/oauth2/v2.0/token`,
    };
  }

  // Methods
  
  async isTokenFresh(secondsMargin: number = 60 * 10 * -1): Promise<boolean> {
  
    const accessToken = await SecureStoragePlugin.get({key: SECURE_STORE_ACCESS_TOKEN});
    const expiresAt = await SecureStoragePlugin.get({key: SECURE_STORE_EXPIRES_AT})
  
    if (!accessToken || !expiresAt) {
      return false;
    }
  
    const expiresAtVal = Number.parseInt(expiresAt.value);
  
    if (expiresAt) {
      const now = Auth.getCurrentTimeInSeconds();
      return now < (expiresAtVal + secondsMargin);
    }
  
    // if there is no expiration time but we have an access token, it is assumed to never expire
    return true;
  }

  async authenticate(emailLinkLogin : boolean, idTokenHint : string | null = null) : Promise<boolean> {

    const oidcOptions = Auth.getOidcOptions(emailLinkLogin, idTokenHint);

    try {
  
      const resp = await OAuth2Client.authenticate(oidcOptions);
  
      const accessToken = resp["access_token"];
      const refreshToken = resp['access_token_response']["refresh_token"];
      const expiresAt = resp['access_token_response']["expires_at"];
  
      await SecureStoragePlugin.set( {key: SECURE_STORE_ACCESS_TOKEN, value: accessToken });
      await SecureStoragePlugin.set( {key: SECURE_STORE_REFRESH_TOKEN, value: refreshToken });
      await SecureStoragePlugin.set( {key: SECURE_STORE_EXPIRES_AT, value: expiresAt });
  
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  async refresh() : Promise<boolean> {

    console.log("Refreshing token");

    const refreshToken = await SecureStoragePlugin.get({key: SECURE_STORE_REFRESH_TOKEN});

    if (!refreshToken) return false;

    const refreshTokenVal = refreshToken.value;

    try {

      const oidcRefreshOptions = Auth.getOidcRefreshOptions(refreshTokenVal);

      const resp = await OAuth2Client.refreshToken(oidcRefreshOptions);

      const accessToken = resp["access_token"];
      const refreshToken = resp["refresh_token"];
      const expiresAt = resp['expires_at'];

      await SecureStoragePlugin.set( {key: SECURE_STORE_ACCESS_TOKEN, value: accessToken });
      await SecureStoragePlugin.set( {key: SECURE_STORE_REFRESH_TOKEN, value: refreshToken });
      await SecureStoragePlugin.set( {key: SECURE_STORE_EXPIRES_AT, value: expiresAt });
  
      return true;

    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  async fetchCurrentAccessToken() : Promise<string|null> {

    const isTokenValid = await this.isTokenFresh();

    // If it is not valid, refresh first. If we're not logged in at all, this will fall through to a false.
    if (!isTokenValid) {
      const couldRefresh = await this.refresh();

      if (!couldRefresh) return null;
    }

    // If we're here, we should have an access token.
    const accessToken = await SecureStoragePlugin.get({key: SECURE_STORE_ACCESS_TOKEN});

    if (!accessToken) return null;

    const accessTokenVal = accessToken.value;

    return accessTokenVal;
  }

}


