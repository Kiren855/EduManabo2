import api from '../api'; // Import instance axios
import env from '~/env'; // Import biến môi trường

/**
 * Gửi request POST tới /courses
 * @param {Object} payload Dữ liệu gửi đi, bao gồm { title, mainTopic }
 * @returns {Promise<Object>} Dữ liệu trả về từ server
 */
export const getDetailCourseOfLearningService = async (courseID) => {
    try {
        const { data } = await api.get(`${env.LEARNING_SERVICE}/${courseID}`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lỗi tạo khóa học:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getCourseRegistered = async () => {
    try {
        const data = await api.get(`${env.LEARNING_SERVICE}`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lỗi tạo khóa học:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};