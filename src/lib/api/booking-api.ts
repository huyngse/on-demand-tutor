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