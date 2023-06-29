import {
  OAuth2Client,
  OAuth2AuthenticateOptions,
  OAuth2RefreshTokenOptions,
} from "@byteowls/capacitor-oauth2";

// Secure Storage Constants.
const SECURE_STORE_ACCESS_TOKEN = "SECURE_STORE_ACCESS_TOKEN";
const SECURE_STORE_REFRESH_TOKEN = "SECURE_STORE_REFRESH_TOKEN";
const SECURE_STORE_EXPIRES_IN = "SECURE_STORE_EXPIRES_IN";
const SECURE_STORE_ISSUED_AT = "SECURE_STORE_ISSUED_AT";

export default class Auth {
  // Helper Methods

  static getCurrentTimeInSeconds(): number {
    return Math.floor(Date.now() / 1000);
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
      accessTokenEndpoint: `https://${process.env.VUE_APP_AUTH_TENANT_NAME}.b2clogin.com/${process.env.VUE_APP_AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.VUE_APP_AUTH_POLICY_NAME}/oauth2/v2.0/token`,
    };
  }

  // Methods

  async isTokenFresh(secondsMargin: number = 60 * 10 * -1): Promise<boolean> {
    const accessToken = localStorage.getItem(SECURE_STORE_ACCESS_TOKEN);
    const expiresIn = localStorage.getItem(SECURE_STORE_EXPIRES_IN);
    const issuedAt = localStorage.getItem(SECURE_STORE_ISSUED_AT);

    if (!accessToken || !expiresIn || !issuedAt) {
      return false;
    }

    const expiresInVal = Number.parseInt(expiresIn);
    const issuedAtVal = Number.parseInt(issuedAt);

    if (expiresIn) {
      const now = Auth.getCurrentTimeInSeconds();
      return now < issuedAtVal + expiresInVal + secondsMargin;
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
      const expiresIn = resp["access_token_response"]["expires_in"];
      const issuedAt = Auth.getCurrentTimeInSeconds().toString();
      localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, accessToken);
      localStorage.setItem(SECURE_STORE_REFRESH_TOKEN, refreshToken);
      localStorage.setItem(SECURE_STORE_EXPIRES_IN, expiresIn);
      localStorage.setItem(SECURE_STORE_ISSUED_AT, issuedAt);

      return true;
    } catch {
      return false;
    }
  }

  async refresh(): Promise<boolean> {
    let refreshToken = localStorage.getItem(SECURE_STORE_REFRESH_TOKEN);

    if (!refreshToken || refreshToken === "undefined") return false;

    try {
      const oidcRefreshOptions = Auth.getOidcRefreshOptions(refreshToken);

      const resp = await OAuth2Client.refreshToken(oidcRefreshOptions);

      const accessToken = resp["access_token_response"]["access_token"];
      refreshToken = resp["access_token_response"]["refresh_token"];
      const expiresIn = resp["access_token_response"]["expires_in"];
      const issuedAt = Auth.getCurrentTimeInSeconds().toString();

      localStorage.setItem(SECURE_STORE_ACCESS_TOKEN, accessToken);
      localStorage.setItem(SECURE_STORE_REFRESH_TOKEN, refreshToken as string);
      localStorage.setItem(SECURE_STORE_EXPIRES_IN, expiresIn);
      localStorage.setItem(SECURE_STORE_ISSUED_AT, issuedAt);

      return true;
    } catch {
      return false;
    }
  }

  async fetchCurrentAccessToken(): Promise<string | null> {
    const isTokenValid = await this.isTokenFresh();

    // If it is not valid, refresh first. If we're not logged in at all, this will fall through to a false.
    if (!isTokenValid) {
      const couldRefresh = await this.refresh();

      if (!couldRefresh) return null;
    }

    // If we're here, we should have an access token.
    const accessToken = localStorage.getItem(SECURE_STORE_ACCESS_TOKEN);

    if (!accessToken) return null;

    const accessTokenVal = accessToken;

    return accessTokenVal;
  }
}
