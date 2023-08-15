import {
  OAuth2Client,
  OAuth2AuthenticateOptions,
  OAuth2RefreshTokenOptions,
} from "@byteowls/capacitor-oauth2";

import { isPlatform } from "@ionic/vue";

// Secure Storage Constants.
const SECURE_STORE_ACCESS_TOKEN = "SECURE_STORE_ACCESS_TOKEN";
const SECURE_STORE_REFRESH_TOKEN = "SECURE_STORE_REFRESH_TOKEN";
const SECURE_STORE_EXPIRES_AT = "SECURE_STORE_EXPIRES_AT";
const SECURE_STORE_ISSUED_AT = "SECURE_STORE_ISSUED_AT";
const SECURE_STORE_AUTH_TYPE = "SECURE_STORE_AUTH_TYPE";

export default class Auth {
  // Helper Methods

  static getCurrentTimeInMs(): number {
    return Math.floor(Date.now());
  }

  static getOidcOptions(
    emailLinkLogin: boolean,
    idTokenHint: string | null
  ): OAuth2AuthenticateOptions {
    const policy = emailLinkLogin
      ? process.env.VUE_APP_AUTH_EMAIL_LINK_SIGNIN_POLICY_NAME
      : process.env.VUE_APP_AUTH_SIGNIN_POLICY_NAME;

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
        redirectUrl:
          "msauth://com.alphavictorapp.app/lvGC0B4SWYU8tNPHg%2FbdMjQinZQ%3D",
      },
      ios: {
        pkceEnabled: true,
        redirectUrl: "msauth.com.alphavictorapp.app://auth",
      },
      additionalParameters: {},
    };

    if (emailLinkLogin) {
      authOptions.additionalParameters = { id_token_hint: idTokenHint };
    }

    return authOptions;
  }

  static getOidcRefreshOptions(
    refreshToken: string
  ): OAuth2RefreshTokenOptions {
    return {
      refreshToken: refreshToken,
      appId: process.env.VUE_APP_AUTH_CLIENT_ID,
      scope: `openid offline_access https://${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.VUE_APP_AUTH_CLIENT_ID}/alphavictor`,
      accessTokenEndpoint: `https://${process.env.VUE_APP_AUTH_TENANT_NAME}.b2clogin.com/${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.VUE_APP_AUTH_SIGNIN_POLICY_NAME}/oauth2/v2.0/token`,
    };
  }

  // Methods

  storeGuestAccessToken(guestToken: string) {
    const accessToken = localStorage.getItem(SECURE_STORE_ACCESS_TOKEN);

    // Don't overwrite an actual access token.
    if (accessToken) return;

    const issuedAtMs = Auth.getCurrentTimeInMs().toString();
    const expiresAtMs = (Auth.getCurrentTimeInMs() + (3600*1000)).toString();

    localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, guestToken);
    localStorage.removeItem(SECURE_STORE_REFRESH_TOKEN);
    localStorage.setItem(SECURE_STORE_ISSUED_AT, issuedAtMs);
    localStorage.setItem(SECURE_STORE_EXPIRES_AT, expiresAtMs);
    localStorage.setItem(SECURE_STORE_AUTH_TYPE, 'Public');
  }

  async isTokenFresh(secondsMargin: number = 60 * 2): Promise<boolean> {
    const accessToken = localStorage.getItem(SECURE_STORE_ACCESS_TOKEN);
    const expiresAt = localStorage.getItem(SECURE_STORE_EXPIRES_AT);

    if (!accessToken || !expiresAt) {
      return false;
    }

    const expiresAtVal = Number.parseInt(expiresAt);

    if (expiresAt) {
      const now = Auth.getCurrentTimeInMs();
      const expire = (expiresAtVal - (secondsMargin * 1000));

      return now < expire;
    }

    // if there is no expiration time but we have an access token, it is assumed to never expire
    return true;
  }

  async authenticate(
    emailLinkLogin: boolean,
    idTokenHint: string | null = null
  ): Promise<boolean> {
    const oidcOptions = Auth.getOidcOptions(emailLinkLogin, idTokenHint);

    try {
      const resp = await OAuth2Client.authenticate(oidcOptions);
      const accessToken = resp["access_token_response"]["access_token"];
      const refreshToken = resp["access_token_response"]["refresh_token"];
      let expiresAt = resp["access_token_response"]["expires_at"];

      if (!expiresAt) {
        expiresAt = resp["access_token_response"]["expires_on"];
      }

      const issuedAt = Auth.getCurrentTimeInMs().toString();
      localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, accessToken);
      localStorage.setItem(SECURE_STORE_REFRESH_TOKEN, refreshToken);
      localStorage.setItem(SECURE_STORE_EXPIRES_AT, expiresAt);
      localStorage.setItem(SECURE_STORE_ISSUED_AT, issuedAt);
      localStorage.setItem(SECURE_STORE_AUTH_TYPE, emailLinkLogin ? 'EmailLinkLogin' : 'UsernamePassword');

      return true;
    } catch {
      return false;
    }
  }

  async refresh(): Promise<boolean> {
    let refreshToken = localStorage.getItem(SECURE_STORE_REFRESH_TOKEN);
    const authType = localStorage.getItem(SECURE_STORE_AUTH_TYPE);

    if (!refreshToken || refreshToken === "undefined") return false;
    if (!authType || authType === "undefined") return false;

    if (authType == "Public") return false;

    try {
      const oidcRefreshOptions = Auth.getOidcRefreshOptions(refreshToken);
      const oidcAuthOptions = Auth.getOidcOptions(authType === 'EmailLinkLogin', null);

      if (!isPlatform('ios') && !isPlatform('android')) {
        // We need to do the refresh call ourselves.

        const endpoint = oidcAuthOptions.accessTokenEndpoint;

        if (!endpoint) return false;

        const rawResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'client_id': oidcRefreshOptions.appId,
            'refresh_token': oidcRefreshOptions.refreshToken,
            'redirect_uri': oidcAuthOptions.redirectUrl ?? ""
          })
        });

        const resp = await rawResponse.json();

        const accessToken = resp["access_token"];
        refreshToken = resp["refresh_token"];
        const expiresAt = resp["expires_on"];
        const issuedAt = Auth.getCurrentTimeInMs().toString();

        localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, accessToken);
        localStorage.setItem(SECURE_STORE_REFRESH_TOKEN, refreshToken as string);
        localStorage.setItem(SECURE_STORE_EXPIRES_AT, expiresAt);
        localStorage.setItem(SECURE_STORE_ISSUED_AT, issuedAt);

      }
      else {

        const resp = await OAuth2Client.refreshToken(oidcRefreshOptions);

        const accessToken = resp["access_token"];
        refreshToken = resp["refresh_token"];
        let expiresAt = resp["expires_at"];
        const issuedAt = Auth.getCurrentTimeInMs().toString();

        if (!expiresAt) {
          expiresAt = resp["expires_on"];
        }

        localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, accessToken);
        localStorage.setItem(SECURE_STORE_REFRESH_TOKEN, refreshToken as string);
        localStorage.setItem(SECURE_STORE_EXPIRES_AT, expiresAt);
        localStorage.setItem(SECURE_STORE_ISSUED_AT, issuedAt);
      }

      return true;
    } catch (e) {
      console.log("Refresh error: " + e);
      return false;
    }
  }

  async fetchCurrentAccessToken(): Promise<string | null> {
    const isTokenValid = await this.isTokenFresh();

    // If it is not valid, refresh first. If we're not logged in at all, this will fall through to a false.
    if (!isTokenValid) {

      console.log("Refreshing");

      const couldRefresh = await this.refresh();

      console.log(`Refresh status: ${couldRefresh}`);

      if (!couldRefresh) return null;
    }

    // If we're here, we should have an access token.
    const accessToken = localStorage.getItem(SECURE_STORE_ACCESS_TOKEN);

    if (!accessToken) return null;

    const accessTokenVal = accessToken;

    return accessTokenVal;
  }

  async logout(): Promise<boolean> {
    const oidcOptions = Auth.getOidcOptions(false, null);
    const accessToken =
      localStorage.getItem(SECURE_STORE_ACCESS_TOKEN) || undefined;
    try {
      await OAuth2Client.logout(oidcOptions, accessToken);
      localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, "");
      localStorage.setItem(SECURE_STORE_REFRESH_TOKEN, "");
      localStorage.setItem(SECURE_STORE_EXPIRES_AT, "");
      localStorage.setItem(SECURE_STORE_ISSUED_AT, "");
      localStorage.setItem(SECURE_STORE_AUTH_TYPE, "");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
