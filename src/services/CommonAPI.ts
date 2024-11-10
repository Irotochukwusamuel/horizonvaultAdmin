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

    public async wallet_list(): Promise<object> {
        const response = await this.axiosInstance.get(`/wallet/wallets`);
        return response?.data?.data;
    }

    public async admin_wallet_list(): Promise<object> {
        const response = await this.axiosInstance.get(`/admin/admin-wallets`);
        return response?.data?.data;
    }

    public async getUser(user_id: number): Promise<object> {
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
        return response?.data?.message;
    }

    public async RemoveAdminWallet(wallet_address: string, coin_id: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/remove-wallet`, {wallet_address, coin_id});
        return response?.data?.message;
    }

    public async CreditWallet(wallet_address: string, amount: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/credit-user`, {wallet_address, amount});
        return response?.data?.message;
    }

    public async DebitWallet(wallet_address: string, amount: number): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/debit-user`, {wallet_address, amount});
        return response?.data?.message;
    }

    public async UpdateInvestmentStatus(investment_id: number, status: string): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/investment/status`, {investment_id, status});
        return response?.data?.message;
    }

    public async CreateScheme(name: string, rate: number, minimum: number, maximum: number, interval: string): Promise<object> {
        const response = await this.axiosInstance.post(`/admin/schemes`, {name, rate: Number(rate), minimum: Number(minimum), maximum: Number(maximum), interval});
        return response?.data?.message;
    }

    public async DeleteInvestment(investment_id: number): Promise<object> {
        const response = await this.axiosInstance.delete(`/admin/investment/${investment_id}`);
        return response?.data?.message;
    }

    public async DeleteScheme(scheme_id: number): Promise<object> {
        const response = await this.axiosInstance.delete(`/admin/schemes/${scheme_id}`);
        return response?.data?.message;
    }

    public async GetAllSchemes(): Promise<object> {
        const response = await this.axiosInstance.get(`/investment/schemes`);
        return response?.data?.data;
    }

    public async GetAllInvestments(): Promise<object> {
        const response = await this.axiosInstance.get(`/admin/investment`);
        return response?.data?.data;
    }

    public async GetInvestment(investment_id: number): Promise<object> {
        const response = await this.axiosInstance.get(`/investment/${investment_id}`);
        return response?.data?.data;
    }

    public async GetAllCoins(): Promise<object> {
        const response = await this.axiosInstance.get(`/investment/coins`);
        return response?.data?.data;
    }

    public async UpdateCoinRate(coin_id: number, rate: number): Promise<object> {
        const response = await this.axiosInstance.post(`/investment/update-coin-rate`, {coin_id: Number(coin_id), rate: Number(rate)});
        return response?.data?.data;
    }


}