import api from '../api'; // Import instance axios
import env from '~/env'; // Import biến môi trường

/**
 * Gửi request POST tới /courses
 * @param {Object} payload Dữ liệu gửi đi, bao gồm { title, mainTopic }
 * @returns {Promise<Object>} Dữ liệu trả về từ server
 */

export const getFullSections = async (courseID) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/courses/full-detail/${courseID}`);
        console.log(response)
        return response.data.result.sections;
    } catch (error) {
        console.error('Lỗi khi lấy sections:', error);
        throw error;
    }
};

// Hàm DELETE để xóa một section trong khóa học
export const deleteSection = async (courseID, sectionID) => {
    console.log(sectionID, courseID)
    try {
        const response = await api.delete(`${env.COURSE_SERVICE}/sections?courseId=${courseID}&sectionId=${sectionID}`);
        console.log(response);
    } catch (error) {
        console.error('Lỗi khi gọi API DELETE:', error);
        throw error;
    }
};

// Hàm POST để tạo một section mới trong khóa học
export const createSection = async (courseID, sectionData) => {
    try {
        console.log(sectionData)
        const response = await api.post(`${env.COURSE_SERVICE}/sections/${courseID}`, sectionData);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm PUT để sửa thông tin của một section trong khóa học
export const updateSection = async (sectionID, sectionData) => {
    try {
        const response = await api.put(`${env.COURSE_SERVICE}/sections/${sectionID}?name=${sectionData.name}&partNumber=${sectionData.partNumber}`);
        console.log(response)
    } catch (error) {
        console.error('Lỗi khi gọi API PUT:', error);
        throw error;
    }
};

// Hàm POST để tạo một video mới trong sections
export const createVideoLesson = async (sectionID, FormData) => {
    try {
        const response = await api.post(`${env.COURSE_SERVICE}/section/lessons/video/${sectionID}`, FormData);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm POST để tạo một video mới trong sections
export const updateVideoLesson = async (sectionID, lessonID, FormData) => {
    try {
        const response = await api.put(`${env.COURSE_SERVICE}/section/lessons/video?sectionId=${sectionID}&lessonId=${lessonID}`, FormData);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm GET để tạo lấy thông tin về video lesson dựa trên typeid trong sections
export const getVideoLessonByTypeId = async (typeId) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/section/lessons/video/${typeId}`);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm tính duration từ video và giải phóng bộ nhớ
export const getDurationFromVideo = (videoFile) => {
    return new Promise((resolve, reject) => {
        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(videoFile);

        videoElement.onloadedmetadata = () => {
            const duration = videoElement.duration; // Lấy duration từ video
            // Giải phóng bộ nhớ sau khi tính toán xong
            URL.revokeObjectURL(videoElement.src);
            resolve(duration); // Trả về duration tính được
        };

        videoElement.onerror = (error) => {
            reject(error); // Nếu có lỗi trong quá trình load video
        };
    });
};

// Hàm POST để tạo một exam trong sections
export const createExamLesson = async (sectionID, data) => {
    try {
        const response = await api.post(`${env.COURSE_SERVICE}/section/lessons/exam/${sectionID}`, data);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm GET để lấy một exam trong sections bằng type id
export const getExamLessonById = async (typeId) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/section/lessons/exam/${typeId}`);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm PUT để sửa một exam trong sections
export const updateExamLesson = async (lessonID, data) => {
    try {
        const response = await api.put(`${env.COURSE_SERVICE}/section/lessons/exam/${lessonID}`, data);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm PUT để sửa một tên của một lesson trong sections
export const updateNameLesson = async (lessonID, data) => {
    try {
        const payload = { name: data };
        const response = await api.put(`${env.COURSE_SERVICE}/section/lessons/${lessonID}`, payload);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm POST để tạo một article trong sections
export const createArticleLesson = async (sectionID, data) => {
    try {
        const response = await api.post(`${env.COURSE_SERVICE}/section/lessons/article/${sectionID}`, data);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm GET để lấy nội dung của article trong sections
export const getContentArticleLesson = async (typeId) => {
    try {
        const response = await api.get(`${env.COURSE_SERVICE}/section/lessons/article/${typeId}`);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm PUT để sửa một article trong sections
export const updatedArticleLesson = async (lessonID, data) => {
    try {
        const payload = { content: data };
        console.log(payload)
        const response = await api.put(`${env.COURSE_SERVICE}/section/lessons/article/${lessonID}`, payload);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm POST để xóa một lesson trong sections
export const deleteLesson = async (sectionID, lessonID) => {
    try {
        const response = await api.delete(`${env.COURSE_SERVICE}/section/lessons?sectionId=${sectionID}&lessonId=${lessonID}`);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};

// Hàm DELETE để xóa một article trong sections
export const Lesson = async (sectionID, lessonID) => {
    try {
        const response = await api.delete(`${env.COURSE_SERVICE}/section/lessons?sectionId=${sectionID}&lessonId=${lessonID}`);
        return response.data.result
    } catch (error) {
        console.error('Lỗi khi gọi API POST:', error);
        throw error;
    }
};