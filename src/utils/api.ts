import { refreshTokenRequest } from './apiAuth';
import { URL, TOKEN_LIFE } from './const';
import { CreateOrder, Ingredient } from './types';

const getIngredients = (): Promise<{ data: Ingredient[] }> => request("ingredients");

const checkRes = async (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    const err = await res.json();
    return await Promise.reject(err);
};

const checkSuc = (res: any) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject({ res });
};

export const request = (endpoint: string, options?: any) => {
    return fetch(`${URL}/${endpoint}`, options)
        .then(checkRes)
        .then(checkSuc);
};

export const requestWithRefresh = async (endpoint: string, options: any) => {
  try {
    const res = await request(endpoint, options);
    return await res;
  } catch (err: any) {
    if (err.message === "jwt malformed") {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      saveTokens(refreshData.accessToken, refreshData.refreshToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await request(endpoint, options);
      return await res;
    } else {
      deleteCookie("token");
      deleteCookie("refreshToken");
      return Promise.reject(err);
    }
  }
};

export function getCookie(name: string,) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\\.$?*|{}\\(\\)\\[\\]\\\\\/\\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, props: any = {}) {
  props = { path: "/", ...props };

  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string,) {
  setCookie(name, null, { expires: -1 });
}

export function saveTokens(accessToken: string, refreshToken: string,) {
  setCookie("token", accessToken.split("Bearer ")[1], {
    expires: TOKEN_LIFE
  });
  setCookie("refreshToken", refreshToken);
}

export function checkToken() {
  const checkTokenResult = Boolean(getCookie("token"));
  return checkTokenResult || false;
}

export function checkRefreshToken() {
  const checkTokenResult = Boolean(getCookie("refreshToken"));
  return checkTokenResult || false;
}

const createOrder = (data: Ingredient[]): Promise<CreateOrder> =>
  request("orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + getCookie("token") },
    body: JSON.stringify({
      ingredients: data.map((ingredient) => {
        return ingredient?._id;
      }),
    }),
  });

export { getIngredients, createOrder };