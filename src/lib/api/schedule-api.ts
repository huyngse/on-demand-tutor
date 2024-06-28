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
export const createSchedule = async (requestBody: any) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.post("/api/v1/schedules", requestBody);
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
export const updateSchedule = async (requestBody: any, scheduleId: number) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.put(`/api/v1/schedules/${scheduleId}`, requestBody);
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
// export const getScheduleById = async (scheduleId: number) => {
//     const response: any = { error: null, data: null, success: false }
//     try {
//         const { data } = await axiosClient.get(`/api/v1/schedules/idTmp?id=${scheduleId}`);
//         if (data && data.Errors) {
//             response.error = data.Errors
//         } else {
//             response.data = data;
//             response.success = true;
//         }
//         return response;
//     } catch (error) {
//         return handleApiError(error);
//     }
// }

export const deleteSchedule = async (scheduleId: number) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.delete(`/api/v1/schedules/${scheduleId}`);
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

export const getSchedulesByClassId = async (classId: number) => {
    const response: any = { error: null, data: null, success: false }
    try {
        const { data } = await axiosClient.get(`/api/v1/schedules/class/${classId}`);
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