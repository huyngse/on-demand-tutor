import Cookies from "js-cookie";

import { axiosClient } from './config/axios-client';
export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const login = async (userName: string, password: string) => {
  const response: any = { error: null, data: null, success: false }
  const requestBody = {
    userName: userName,
    password: password
  }
  try {
    const { data } = await axiosClient.post("api/v1/users/login", requestBody);

    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const register = async (requestBody: any) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.post("api/v1/users/register", requestBody);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const checkToken = async () => {
  const response: any = { error: null, data: null, success: false };
  const cookieValue = Cookies.get('loggedUser');
  try {
    if (cookieValue) {
      const user = JSON.parse(cookieValue);
      response.data = user;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}