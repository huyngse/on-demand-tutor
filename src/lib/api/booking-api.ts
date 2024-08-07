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

export const getAllBooking = async () => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/bookings`);
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

export const getBookingByScheduleId = async (scheduleId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/bookings/schedule/${scheduleId}`);
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

export const getBookingbyId = async (bookingId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/bookings/${bookingId}`);
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

export const getBookingDetailbyId = async (bookingId: number) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const { data } = await axiosClient.get(`api/v1/bookings/detail/${bookingId}`);
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




export type BookingStatusType = "Pending" | "Cancelled" | "Accepted" | "Denied" | "Started" | "Ended" | "Cancelled_by_student" | "Cancelled_by_tutor";
export const changeBookingStatus = async (
  bookingId: number,
  bookingStatus: BookingStatusType
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
export const cancelBooking = async (
  bookingId: number,
  status: BookingStatusType,
  cancellationReason: string,
) => {
  const response: any = { error: null, data: null, success: false }
  const request = {
    status: status,
    cancellationReason: cancellationReason
  };
  try {
    const { data } = await axiosClient.put(`/api/v1/bookings/cancel/${bookingId}`, request);
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
  status: BookingStatusType,
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
