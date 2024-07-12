import { axiosClientMultipart } from "./config/axios-client-multi-form";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const uploadImage = async (image: File) => {
  const response: any = { error: null, data: null, success: false }
  try {
    const form = new FormData();
    form.append("image", image);
    const { data } = await axiosClientMultipart.post("/api/v1/Firebase", form);
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
