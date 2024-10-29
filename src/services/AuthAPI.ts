import BaseAPI from './BaseAPI';
import {AppwriteUser} from "@/types/user";

export class AuthApi extends BaseAPI {


    public async SignIn(
        password: string,
        email: string,
    ): Promise<AppwriteUser> {
        try {
            const response = await this.axiosInstance.post('/auth/login', {
                password,
                email,
            });

            return response?.data?.data;
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }


    public async ForgotPassword(email: string): Promise<{ response: object }> {
        try {
            const response = await this.axiosInstance.post('/auth/reset-password', {email});
            return {response};
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

    public async ResetPassword(email: string, password: string, otp: string): Promise<{ response: object }> {
        try {
            const response = await this.axiosInstance.post('/auth/update-password', {email, password, otp});
            return {response};
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

}