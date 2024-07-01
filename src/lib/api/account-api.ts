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
export const getAllAccounts = async () => {
  const response: any = {
    error: null,
    data: null,
    success: false
  }
  try {
    const { data } = await axiosClient.get("/api/v1/users");
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

export const getAccountById = async (id: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    console.log(`/api/v1/users/${id}`);
    const { data } = await axiosClient.get(`/api/v1/users/idTmp?idTmp=${id}`);
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

export const getApi = async () => {
  const response: any = {
    error: null,
    data: null,
    success: false
  }
  try {
    const { data } = await axiosClient.get("/api/v1/users");
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
