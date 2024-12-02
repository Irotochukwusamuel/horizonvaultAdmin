import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {destroyCookie, setCookie} from "nookies";
import {redirect} from "next/navigation";

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

const baseURL = 'https://api.fomobitmax.com';

export class BaseAPI {
    public axiosInstance: AxiosInstance;


    constructor(token?: string) {
        this.axiosInstance = axios.create({baseURL});

        this.axiosInstance.interceptors.request.use(
            async config => {

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                config.headers.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

                return config;
            },
            error => Promise.reject(error),
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            this.handleErrorResponse.bind(this),
        );
    }

    public async handleErrorResponse(error: any): Promise<any> {
        if (error.response?.status === 401) {
            redirect('/')
        }
        return Promise.reject(
            this.formatErrorMessage(error).response?.data?.message,
        );
    }

    public formatErrorMessage(error: any): Error {
        return error;
    }

}

export default BaseAPI;