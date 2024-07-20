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
    const { data } = await axiosClient.get("/api/v1/class");
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
export const searchClass = async (searchQuery: string) => {
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
    const { data, headers } = await axiosClient.get(`/api/v1/class/search${searchQuery}`);
    if (data && data.Errors) {
      response.error = data.Errors
    } else {
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

export const getClassesByTutorId = async (tutorId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`/api/v1/class/tutor/${tutorId}`);
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

export const getClassById = async (classId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`/api/v1/class/${classId}`);
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
    const { data } = await axiosClient.put(`/api/v1/class/deativate/${classId}`);
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
    const { data } = await axiosClient.post("/api/v1/class", requestBody);
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
    const { data } = await axiosClient.put(`/api/v1/class/${classId}`, requestBody);
    if (data) {
      response.data = data;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

