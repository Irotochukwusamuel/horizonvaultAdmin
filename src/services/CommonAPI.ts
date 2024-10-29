import BaseAPI from './BaseAPI';
import {AppwriteUser} from "@/types/user";

export class CommonApi extends BaseAPI {
    constructor(token: string) {
        super(token);
    }

    public async Transactions(page: number, per_page: number): Promise<object> {
        const response = await this.axiosInstance.get(`/admin/transactions?page=${page}&per_page=${per_page}`);
        return response?.data?.data;
    }

    public async Users(page: number, per_page: number): Promise<AppwriteUser[]> {
        const response = await this.axiosInstance.get(`/admin/users?page=${page}&per_page=${per_page}`);
        return response?.data?.data;
    }

    public async me(): Promise<AppwriteUser> {
        const response = await this.axiosInstance.get(`/wallet/get-user`);
        return response?.data?.data;
    }

    public async getUser(user_id: number): Promise<AppwriteUser> {
        const response = await this.axiosInstance.get(`/admin/users/${user_id}`);
        return response?.data?.data;
    }

    public async DeactivateUser(email: string): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/deactivate-user`, {email});
        return response?.data?.message
    }

    public async ActivateUser(email: string): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/activate-user`, {email});
        return response?.data?.message
    }

    public async AddAdmin(email: string): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/add-admin`, {email});
        return response?.data?.message
    }

    public async RemoveAdmin(email: string): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/remove-admin`, {email});
        return response?.data?.message
    }

    public async ApproveTransaction(transaction_id: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/approve-transaction`, {transaction_id});
        return response?.data?.message
    }

    public async CancelTransaction(transaction_id: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/cancel-transaction`, {transaction_id});
        return response?.data?.message
    }

    public async AddAdminWallet(wallet_address: string, coin_id: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/add-wallet`, {wallet_address, coin_id});
        return response?.data?.data;
    }

    public async RemoveAdminWallet(wallet_address: string, coin_id: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/remove-wallet`, {wallet_address, coin_id});
        return response?.data?.data;
    }

    public async CreditWallet(wallet_address: string, amount: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/credit-user`, {wallet_address, amount});
        return response?.data?.data;
    }

    public async DebitWallet(wallet_address: string, amount: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/debit-user`, {wallet_address, amount});
        return response?.data?.data;
    }

}