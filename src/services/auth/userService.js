import api from '../api'; // Import instance axios
import env from '~/env'; // Import biến môi trường

/**
 * Gửi request POST tới /courses
 * @param {Object} payload Dữ liệu gửi đi, bao gồm { title, mainTopic }
 * @returns {Promise<Object>} Dữ liệu trả về từ server
 */
export const getProfile = async () => {
    try {
        const { data } = await api.get(`${env.API_BASE_URL}/user/profile`);
        return data.result; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lỗi lấy profile:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const updateProfile = async (payload) => {
    try {
        const response = await api.put(`${env.API_BASE_URL}/user/profile`, payload);
        return response; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lỗi lấy profile:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};