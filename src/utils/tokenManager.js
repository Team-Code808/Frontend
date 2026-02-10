import { decodeToken } from "./jwtUtils";

let accessToken = null;
let tokenExp = null;
let isRefreshing = false;
let refreshSubscribers = [];

export const tokenManager = {
  getAccessToken: () => accessToken,

  setAccessToken: (token) => {
    accessToken = token;
    if (token) {
      const decoded = decodeToken(token);
      tokenExp = decoded?.exp || null;
    } else {
      tokenExp = null;
    }
  },

  clearAccessToken: () => {
    accessToken = null;
    tokenExp = null;
  },

  isTokenExpired: () => {
    if (!accessToken) return true;

    if (!tokenExp) {
      const decoded = decodeToken(accessToken);
      tokenExp = decoded?.exp || null;
    }

    if (!tokenExp) return true;
    const currentTime = Date.now() / 1000;
    return tokenExp < currentTime;
  },

  isRefreshing: () => isRefreshing,
  setRefreshing: (status) => {
    isRefreshing = status;
  },

  subscribeTokenRefresh: (callback) => {
    refreshSubscribers.push(callback);
  },

  onTokenRefreshed: (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
  },

  clearSubscribers: () => {
    refreshSubscribers = [];
  },
};
