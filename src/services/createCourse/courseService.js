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

        return response.data.result;

    } catch (error) {
        console.error('Error fetching course overview:', error);
        throw error;
    }
};

// Update course overview
export const updateCourseOverview = async (courseID, courseData) => {
    try {
        await api.put(`${env.COURSE_SERVICE}/courses/overview/${courseID}`, courseData);
    } catch (error) {
        throw error;
    }
};

// Hàm GET lấy dữ liệu mục tiêu và yêu cầu
export const getTargetRequirements = async (courseID) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/courses/target-require/${courseID}`);

        return response.data.result;  // Trả về danh sách targetAudiences và requirements

    } catch (error) {
        console.error('Lỗi khi gọi API GET:', error);
        throw error; // Thông báo lỗi để xử lý ở nơi gọi
    }
};

// Hàm PUT để cập nhật dữ liệu mục tiêu và yêu cầu
export const updateTargetRequirements = async (courseID, data) => {
    try {
        const response = await api.put(`${env.COURSE_SERVICE}/courses/target-require/${courseID}`, data);

        return response.data.message;  // Trả về thông báo thành công

    } catch (error) {
        console.error('Lỗi khi gọi API PUT:', error);
        throw error;
    }
};

// Hàm PUT để cập nhật dữ liệu mục tiêu và yêu cầu
export const deleteCourse = async (courseID) => {
    try {
        await api.delete(`${env.COURSE_SERVICE}/courses/${courseID}`);

    } catch (error) {
        console.error('Lỗi khi gọi API PUT:', error);
        throw error;
    }
};

// Hàm POST để xuất bản một khóa học 
export const submitCourse = async (courseID) => {
    try {
        await api.post(`${env.COURSE_SERVICE}/courses/submit/${courseID}`);
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

/*
 ---------------------------ADMIN---------------------------
*/

// Hàm GET để lấy danh sách khóa học được submit cho admin
export const getSubmitCourses = async () => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/courses/admin/course-submited`);
        return response;
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm POST để chấp nhận một course dành cho admin
export const approveCourse = async (courseID) => {
    try {
        await api.post(`${env.COURSE_SERVICE}/courses/admin/approve/${courseID}`);
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm POST để từ chối một course dành cho admin
export const rejectCourse = async (courseID, payload) => {
    try {
        await api.post(`${env.COURSE_SERVICE}/courses/admin/reject/${courseID}`, payload);
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm POST để từ chối một course dành cho admin
export const getPreview = async (courseID) => {
    try {
        const responce = await api.get(`${env.COURSE_SERVICE}/courses/preview/${courseID}`);
        return responce.data.result;
    } catch (error) {
        console.error('Lỗi khi lay preview:', error);
        throw error;
    }
};