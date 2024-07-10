/* eslint-disable no-underscore-dangle */

import axios from "axios";
import cookie from "cookie";
import Router from "next/router";

import initializeStore from "../store";
import { getPath } from "../config/urls";
import { removeDocumentAuthCookies } from "./auth";
import { signOut, signingOut } from "../reducers/auth/authReducer";

const REDUX_STORE = "REDUX_STORE";
const isServer = typeof window === "undefined";

// @note backend API URL
const baseURL = "http://localhost:3000/";

const clearCacheAndSignout = () => {
  window[REDUX_STORE].dispatch(signingOut());
  removeDocumentAuthCookies();
  window[REDUX_STORE].dispatch(signOut());
  Router.push(getPath("signInPath"));
};

const handleRequest = (request) => {
  const headers = { "token-type": "Bearer" };
  const data = cookie.parse(document.cookie);

  if (data.uid) headers.uid = data.uid;
  if (data.expiry) headers.expiry = data.expiry;
  if (data.client) headers.client = data.client;
  if (data["access-token"]) headers["access-token"] = data["access-token"];
  request.headers = { ...headers, ...request.headers };
  return request;
};

// todo investigate axios response error in onSuccess
const handleResponseError = (error) => {
  const { response } = error;

  if (response.status === 401) {
    // todo: show notification to alert user of authroization
  } else {
    // @note other potential server error
    // todo: handle specific server error
  }

  return error;
};

const getOrCreateStore = () => {
  // @note Always make a new store if server, otherwise state is shared between requests
  if (isServer) return initializeStore();

  // Create store if unavailable on the client and set it on the window object
  if (!window[REDUX_STORE]) {
    const axiosClientConfig = {
      baseURL,
      // withCredentials: true,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    const axiosInstance = axios.create(axiosClientConfig);

    axiosInstance.interceptors.request.use((request) => handleRequest(request));

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => handleResponseError(error, axiosInstance)
    );

    window[REDUX_STORE] = initializeStore(axiosInstance);
  }
  return window[REDUX_STORE];
};

export default getOrCreateStore;
