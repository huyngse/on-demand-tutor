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
export const createSchedule = async (requestBody: any) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.post("/api/v1/schedules", requestBody);
        if (data) {
            response.data = data;
            response.success = true;
        }
        return response;
    } catch (error) {
        return handleApiError(error);
    }
}
export const updateSchedule = async (requestBody: any, scheduleId: number) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.put(`/api/v1/schedules?id=${scheduleId}`, requestBody);
        if (data) {
            response.data = data;
            response.success = true;
        }
        return response;
    } catch (error) {
        return handleApiError(error);
    }
}
export const getScheduleById = async (scheduleId: number) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.get(`/api/v1/schedules/idTmp?id=${scheduleId}`);
        if (data) {
            response.data = data;
            response.success = true;
        }
        return response;
    } catch (error) {
        return handleApiError(error);
    }
}

