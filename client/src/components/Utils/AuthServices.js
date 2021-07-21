import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const StorageKey = "@MyAppOAuthKey";

export async function cacheAuthAsync(authState) {
  return await localStorage.setItem(StorageKey, authState);
}

export const setCookiesAuth = async (authState) => {
  return await Cookies.set(StorageKey, authState, {
    expires: 7,
    secure: true,
    sameSite: "lax",
  });
};

export const getCookiesAuth = async () => {
  let value = await Cookies.get(StorageKey);
  let authState = null;
  if (value) {
    authState = JSON.parse(value);
  }

  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
};

export const removeCookiesAuth = async () => {
  try {
    let value = Cookies.get(StorageKey);
    let authState = JSON.parse(value);

    await Cookies.remove(StorageKey);
    return authState;
  } catch (error) {
    alert(`Failed to revoke token: ${error}`);
  }
};

function checkIfTokenExpired({ token }) {
  let decodeToken = jwtDecode(token);
  let accessTokenExpirationDate = decodeToken.exp;

  return new Date(accessTokenExpirationDate * 1000) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  /*api.post("token/refresh", {
      data: { refresh_token: refreshToken },*/
  console.log("refresh");
}

export async function getCachedAuthAsync() {
  let value = await localStorage.getItem(StorageKey);
  let authState = JSON.parse(value);

  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }

  return null;
}

export async function signOutAsync() {
  try {
    let value = await localStorage.getItem(StorageKey);
    let authState = JSON.parse(value);

    //console.log(authState);
    /* await AppAuth.revokeAsync(config, {
          token: authState.accessToken,
          isClientIdProvided: true,
        });*/
    await localStorage.removeItem(StorageKey);
    return authState;
  } catch (e) {
    alert(`Failed to revoke token: ${e}`);
  }
}
