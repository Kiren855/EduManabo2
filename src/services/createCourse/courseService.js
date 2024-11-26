import { date } from 'yup';
import api from '../api'; // Import instance axios
import env from '~/env'; // Import biến môi trường

/**
 * Gửi request POST tới /courses
 * @param {Object} payload Dữ liệu gửi đi, bao gồm { title, mainTopic }
 * @returns {Promise<Object>} Dữ liệu trả về từ server
 */
export const createCourse = async (payload) => {
    try {
        const { data } = await api.post(`${env.COURSE_SERVICE}/courses`, payload);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lỗi tạo khóa học:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getListCourses = async () => {
    try {
        const { data } = await api.get(`${env.COURSE_SERVICE}/courses`);
        return data.result; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Đã có lỗi xảy ra:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Hàm GET để lấy giá hiện tại của khóa học
export const getPrice = async (courseID) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/courses/get-price/${courseID}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy giá:', error);
        throw error;
    }
};

// Hàm PUT để cập nhật giá của khóa học
export const updatePrice = async (courseID, price) => {
    try {
        const response = await api.put(`${env.COURSE_SERVICE}/courses/change-price/${courseID}`, { price });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật giá:', error);
        throw error;
    }
};

// Lấy tin nhắn chào mừng và chúc mừng cho khóa học
export const getCourseMessages = async (courseID) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/courses/notify/${courseID}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tải tin nhắn khóa học:', error);
        throw error;
    }
};

// Cập nhật tin nhắn chào mừng và chúc mừng
export const updateCourseMessages = async (courseID, messages) => {
    try {
        console.log(messages)
        const response = await api.put(`${env.COURSE_SERVICE}/courses/notify/${courseID}`, messages);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật tin nhắn khóa học:', error);
        throw error;
    }
};

// Get course overview
export const getCourseOverview = async (courseID) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/courses/overview/${courseID}`);
        if (response.data.code === 1000) {
            return response.data.result;
        } else {
            throw new Error(response.data.message || 'Error fetching course overview');
        }
    } catch (error) {
        console.error('Error fetching course overview:', error);
        throw error;
    }
};

// Update course overview
export const updateCourseOverview = async (courseID, courseData) => {
    try {
        const response = await api.put(`${env.COURSE_SERVICE}/courses/overview/${courseID}`, courseData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.code === 1000) {
            return response.data.message; // Return success message
        } else {
            throw new Error(response.data.message || 'Error updating course overview');
        }
    } catch (error) {
        console.error('Error updating course overview:', error);
        throw error;
    }
};
