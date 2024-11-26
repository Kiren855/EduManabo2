import axios from 'axios';
import env from '~/env';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, clearTokens } from './auth/authHelper';

const api = axios.create({
    baseURL: env.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm Interceptor để tự động thêm accessToken vào request
api.interceptors.request.use(
    (request) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => Promise.reject(error)
);

// Thêm Interceptor để xử lý khi accessToken hết hạn
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const { data } = await axios.post(`${env.API_BASE_URL}/user/auth/refreshToken`, {
                        refreshToken,
                    });
                    saveAccessToken(data.result.access_token); // Lưu accessToken mới
                    saveRefreshToken(data.result.refresh_token); // Lưu refreshToken mới
                    originalRequest.headers.Authorization = `Bearer ${data.result.access_token}`;
                    return api(originalRequest); // Gửi lại request ban đầu với accessToken mới
                } catch (err) {
                    clearTokens();
                    window.location.href = '/auth'; // Điều hướng về trang đăng nhập
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(error);
    }
);

// Hàm làm mới token định kỳ
const startTokenRefreshInterval = () => {
    const refreshInterval = 20 * 60 * 1000; // 20 phút
    setInterval(async () => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            try {
                const { data } = await axios.post(`${env.API_BASE_URL}/user/auth/refreshToken`, {
                    refreshToken,
                });
                saveAccessToken(data.result.access_token); // Lưu accessToken mới
                saveRefreshToken(data.result.refresh_token); // Lưu refreshToken mới
            } catch (err) {
                console.error('Error refreshing token:', err);
                clearTokens();
                window.location.href = '/auth'; // Điều hướng về trang đăng nhập
            }
        }
    }, refreshInterval);
};

// Gọi hàm làm mới token khi ứng dụng khởi chạy
startTokenRefreshInterval();

export default api;
