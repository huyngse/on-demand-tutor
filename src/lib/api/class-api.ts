import classesData from "@/data/classes";
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

export const getAllClass = async () => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get("/api/v1/classs/classes");
    if (data) {
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
  try {
    const classResult = classesData.find((x) => x.ClassId == classId);
    return { error: null, data: classResult, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}