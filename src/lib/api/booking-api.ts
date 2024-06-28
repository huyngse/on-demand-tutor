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

export const createBooking = async (requestBody: any) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.post("/api/v1/bookings", requestBody);
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

export const getTutorBooking = async (tutorId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/bookings/tutor/${tutorId}`);
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

export const getStudentBooking = async (studentId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/bookings/student/${studentId}`);
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


type BookingStatus = "Pending" | "Cancelled" | "Accepted" | "Denied" | "Started" | "Ended";
export const changeBookingStatus = async (
  bookingId: number,
  bookingStatus: BookingStatus
) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/bookings/status/${bookingId}?status=${bookingStatus}`);
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

export type UpdateBookingDto = {
  description: string,
  address: string,
  status: BookingStatus,
  startDate: string,
  endDate: string,
}

export const updateBooking = async (
  bookingId: number,
  requestBody: UpdateBookingDto,
) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.put(`/api/v1/bookings/${bookingId}`, requestBody);
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
