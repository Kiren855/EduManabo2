import api from '../api';
import { saveAccessToken, saveRefreshToken } from './authHelper';

export const login = async (email, password) => {
    try {
        const { data } = await api.post('/user/auth/login', { email, password });
        const { access_token, refresh_token } = data.result;
        saveAccessToken(access_token);
        saveRefreshToken(refresh_token);
        return {
            message: data.message, // Thông báo từ API (ví dụ: Đăng nhập thành công)
            tokens: {
                accessToken: access_token,
                refreshToken: refresh_token,
            },
        };
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const register = async ({ username, email, password, firstName, lastName, dob }) => {
    try {
        const { data } = await api.post('/user/auth/register', {
            username,
            email,
            password,
            firstName,
            lastName,
            dob,
        });
        return data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

