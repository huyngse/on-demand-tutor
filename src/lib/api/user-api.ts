import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const getAllUsers = async () => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get("api/v1/users");
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const getUserById = async (userId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`/api/v1/users/idTmp?idTmp=${userId}`);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
