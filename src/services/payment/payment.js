import api from "../api";
import env from "~/env";

/**
 * Gửi request POST tới /courses
 * @param {Object} payload Dữ liệu gửi đi, bao gồm { title, mainTopic }
 * @returns {Promise<Object>} Dữ liệu trả về từ server
 */

/*
-------------------------Cart-------------------------
*/
export const getCart = async () => {
    try {
        const { data } = await api.get(`${env.ORDER_SERVICE}/carts`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lấy cart thất bại:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const addToCart = async (payload) => {
    try {
        console.log(payload)
        const { data } = await api.post(`${env.ORDER_SERVICE}/carts`, payload);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('add cart error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const moveToWishList = async (courseID) => {
    try {
        console.log(courseID)
        const { data } = await api.post(`${env.ORDER_SERVICE}/carts/move-to-wishlist/${courseID}`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Move to wish list error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const deleteCart = async (courseID) => {
    try {
        const { data } = await api.delete(`${env.ORDER_SERVICE}/carts/${courseID}`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('delete cart error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

/*
-------------------------Wish List-------------------------
*/
export const getWishList = async () => {
    try {
        const { data } = await api.get(`${env.ORDER_SERVICE}/wish-list`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Lấy wish-list thất bại:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const addToWishList = async (payload) => {
    try {
        const { data } = await api.post(`${env.ORDER_SERVICE}/wish-list`, payload);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('add wish list error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const moveToCart = async (courseID) => {
    try {
        const { data } = await api.post(`${env.ORDER_SERVICE}/wish-list/move-to-cart/${courseID}`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Move to cart error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const deleteWishList = async (courseID) => {
    try {
        const { data } = await api.delete(`${env.ORDER_SERVICE}/wish-list/${courseID}`);
        return data; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('delete wish list error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

/* 
-------------------------Order Payment-------------------------
*/

export const orderPayment = async () => {
    try {
        const payload = {};
        const response = await api.post(`${env.ORDER_SERVICE}/order-payment`, payload);
        return response; // Trả về dữ liệu server gửi về
    } catch (error) {
        console.error('Loi thanh toan:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
