// import { axiosClient } from './config/axios-client';
import { tutorData } from "@/data/tutor";
export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const getAllTutors = async () => {
  try {
    return { error: null, data: tutorData, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}
