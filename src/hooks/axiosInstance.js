import axios from 'axios';
import Login from "../view/home/Login.jsx";

const axiosConfig = {
    baseURL: import.meta.env.VITE_URL_Prefix,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    responseType: 'json',
};

const AxiosInstance = axios.create(axiosConfig);

// 设置请求拦截器
AxiosInstance.interceptors.request.use(
    (config) => {
        // 在请求发送前执行此函数
        const storedUserInfo = localStorage.getItem('userInfo');
        const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

        // 设置请求头
        if (userInfo && userInfo.token) {
            // console.log(userInfo)
            // config.headers.Authorization = `Bearer ${userInfo.token}`;
            config.headers.Authorization = `${userInfo.token}`;
        }

        return config;
    },
    (error) => {
        // 对请求错误的处理
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (res) => {
        if (res.status !== 200 || !res.data) {
            throw 'error';
        }
        return res.data;
    },
    (error) => {
        throw error;
    }
);

export default AxiosInstance;