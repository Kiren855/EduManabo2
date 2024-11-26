import axios from "axios";
import env from "~/env";

// Hàm gọi API để lấy danh sách topics và subtopics
export const getCategories = async () => {
    try {
        const response = await axios.get(`${env.COURSE_SERVICE}/public/topics`);
        // Lấy kết quả từ API
        const topics = response.data.result;

        return topics;
    } catch (err) {
        console.error("Lỗi khi lấy danh sách topic:", err);
        throw new Error("Lỗi khi lấy dữ liệu");
    }
};
