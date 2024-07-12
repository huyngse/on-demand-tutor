import { axiosClient } from './config/axios-client';
export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
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
    if (data && data.Errors) {
      response.error = data.Errors
    } else {
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
    if (data && data.Errors) {
      response.error = data.Errors
    } else {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const sendEmail = async (email: string) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.post(`/SendMail?to=${email}`);
    if (data && data.Errors) {
      response.error = data.Errors
    } else {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}


export const checkToken = async () => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`/checkToken`);
    if (data && data.Errors) {
      response.error = data.Errors
    } else {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}