import { UserRole } from "@/types/user-roles";
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

export const searchTutor = async (searchQuery: string) => {
  const response: any = {
    error: null,
    data: null,
    success: false,
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  }
  if (searchQuery.length > 0) {
    searchQuery = "?" + searchQuery;
  }

  try {
    const { data, headers } = await axiosClient.get(`api/v1/users/tutor/search${searchQuery}`);
    if (data) {
      response.currentPage = parseInt(headers["x-current-page"]);
      response.totalCount = parseInt(headers["x-total-count"]);
      response.totalPages = parseInt(headers["x-total-pages"]);
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
    const { data } = await axiosClient.get(`/api/v1/users/${userId}`);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export type UpdateUserRequest = {
  username: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  city: string;
  district: string;
  ward: string;
  street: string;
}

export const updateUser = async (userId: number, request: UpdateUserRequest) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/users/${userId}`, request);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateUserStatus = async (userId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/users/status/${userId}`);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateUserRoles = async (userId: number, role: UserRole) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/users/role/${userId}`, role);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
export type UpdateTutorProfileRequest = {
  password: string,
  fullName: string,
  phoneNumber: string,
  dateOfBirth: string,
  gender: string,
  city: string,
  district: string,
  ward: string,
  street: string,
  tutorType: string,
  school: string,
  tutorDescription: string
}
export const updateTutorProfile = async (userId: number, request: UpdateTutorProfileRequest) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/users/tutor/${userId}`, request);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}