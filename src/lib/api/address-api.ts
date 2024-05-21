// import { axiosClient } from './config/axios-client';
import addressData from "@/constants/vietnamAddress.json"
export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const getVietnamAddress = async () => {
  try {
    return { error: null, data: addressData, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}
