import {Expression, Role} from '@/lib/utils';
import {
    CompleteLessonData,
    CourseProgressData,
    Course,
    CompleteModuleData,
} from './course';
import {QuizResponse} from './quiz';
import {Models} from 'appwrite';

export type User = {
    access_token: string;
    country: string | null;
    created_at: number;
    deactivate_reason: string | null;
    email: string;
    expiration_in_seconds: number;
    first_name: string | null;
    has_email_notification_enabled: boolean;
    isDeactivated: boolean;
    isEmailVerified: boolean;
    isMsisdnVerified: boolean;
    is_admin: boolean;
    language: string;
    last_name: string | null;
    last_updated: number;
    msisdn: string | null;
    referral_id: string;
    refresh_token: string;
    user_id: number;
    username: string;
};
export type AppwriteUser = User;

export type UserPartner = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    is_deleted?: boolean;
    user?: User;
};

export type UserPayment = {
    amount: number;
    coin_id: number;
    created_at: number;
    id: number;
    last_updated: number;
    network: string | null;
    receiver_address: string | null;
    receiver_fee: number;
    receiver_id: number;
    sender_fee: number;
    sender_id: number;
    status: string;
    transaction_type: string;
};
export type Investments = {
    email : string
    first_name : string,
    last_name : string,
    amount: number;
    created_at: number;
    id: number;
    last_updated: number;
    deposit_type: string | null;
    investment_interval: string | null;
    investment_name: string;
    investment_rate: string;
    scheme_id: number;
    status: string;
    wallet_id: string | null;
};
export type AppwriteUserPayment = UserPayment;

type SignupForm = Pick<User, 'first_name' | 'last_name' | 'phone' | 'email'> & {
    password: string;
};

type LoginForm = Pick<User, 'email'> & { password: string };

type AboutForm = Pick<
    User,
    | 'role'
    | 'partner'
    | 'selected_course'
    | 'member_of_tec'
    | 'expression'
    | 'marry_in_tec'
    | 'wedding_date'
>;

type ChangePasswordForm = {
    newPassword: string;
    oldPassword: string;
    confirmPassword: string;
};

type ResetPasswordForm = {
    password: string;
    passwordConfirm: string;
};
