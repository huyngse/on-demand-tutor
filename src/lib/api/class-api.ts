import classesData from "@/data/classes";
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
export const getAllClass = async () => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get("/api/v1/classs/classes");
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

export const getClassesByTutorId = async (tutorId: number) => {
  try {
    const classes = classesData.filter((x: any) => x.TutorId == tutorId);
    return { error: null, data: classes, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getClassById = async (classId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`/api/v1/classs/${classId}`);
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

export const deactivateClass = async (classId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    console.log(`/api/v1/classs/${classId}`);
    const { data } = await axiosClient.put(`/api/v1/classs/${classId}`);
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

export const createClass = async (requestBody: any) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.post("/api/v1/classs", requestBody);
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

export const updateClass = async (requestBody: any, classId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/classs/class/${classId}`, requestBody);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

