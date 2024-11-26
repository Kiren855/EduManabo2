export const saveAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const saveRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};
