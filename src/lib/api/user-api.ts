import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
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

export const getAllTutors = async () => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get("api/v1/users/tutor");
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

export const getTutorbyId = async (userId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/users/tutor/${userId}`);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateUserProfileImage = async (userId: number, imageUrl: string) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`​/api​/v1​/users​/profileImage​/${userId}`, imageUrl);
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
