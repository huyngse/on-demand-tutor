// import { axiosClient } from './config/axios-client';
import { tutorData } from "@/data/tutor";
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
export type TutorStatisticType = {
  noOfCreatedClasses: number;
  noOfActiveClasses: number;
  noOfBooking: number;
  noOfRequest: number;
  recentBooking: any[];
}
export const getTutorStatistic = async () => {
  const response: any = { error: null, data: null, success: false }
  const responseData: TutorStatisticType = {
    noOfCreatedClasses: 0,
    noOfActiveClasses: 0,
    noOfBooking: 0,
    noOfRequest: 0,
    recentBooking: []
  }
  try {
    const classesResult = await axiosClient.get("/api/v1/classs/classes");
    if (classesResult && classesResult.data.Errors) {
      response.error = classesResult.data.Errors
    } else {
      responseData.noOfCreatedClasses = classesResult.data.length;
      response.data = responseData;
      response.success = true;
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
export const getTutorById = async (id: number) => {
  try {
    const tutor = tutorData.find(tutor => tutor.id == id);
    return { error: null, data: tutor, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getTutorDegrees = async (tutorId: number) => {
  try {
    const response = await axiosClient.get(`/api/v1/tutordegrees`, {
      params: { TutorId: tutorId }
    });
    if (response && response.data.Errors) {
      return { error: response.data.Errors, data: null, success: false };
    } else {
      return { error: null, data: response.data, success: true };
    }
  } catch (error) {
    return handleApiError(error);
  }
};