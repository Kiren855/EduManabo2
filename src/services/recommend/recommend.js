import axios from "axios";
import env from "~/env";

// Hàm gọi API để lấy danh sách topics và subtopics
export const getRecommend = async () => {
    try {
        const response = await axios.get(`${env.COURSE_SERVICE}/courses-home/recommend`);
        // Lấy kết quả từ API
        const r = response.data.result;

        return r;
    } catch (err) {
        console.error("Lỗi khi lấy danh sách topic:", err);
        throw new Error("Lỗi khi lấy dữ liệu");
    }
};

export const getRecommendWithTopic = async () => {
    try {
        const response1 = await axios.get(`${env.COURSE_SERVICE}/courses-home/recommend/6740d2735e4fe7f11901d670`);
        const response2 = await axios.get(`${env.COURSE_SERVICE}/courses-home/recommend/6740d5345e4fe7f11901d69b`);
        const response3 = await axios.get(`${env.COURSE_SERVICE}/courses-home/recommend/6740d6555e4fe7f11901d6b1`);
        // Lấy kết quả từ API
        const r1 = response1.data.result;
        const r2 = response2.data.result;
        const r3 = response3.data.result;
        const r = [
            ...r1,
            ...r2,
            ...r3
        ];
        console.log(r);
        return r;
    } catch (err) {
        console.error("Lỗi khi lấy danh sách topic:", err);
        throw new Error("Lỗi khi lấy dữ liệu");
    }
};
