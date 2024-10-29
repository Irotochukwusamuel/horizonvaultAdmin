import { account, databases } from '@/appwrite';
import { BASE_URL, DATABASE_ID, USERS_COLLECTION_ID } from '@/lib/constants';
import { AppwriteUser, ChangePasswordForm, LoginForm } from '@/types/user';
import { Query } from 'appwrite';
import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

export async function login({ email, password }: LoginForm) {
  try {
    try {
      await account.get();
      await logout();
      return await account.createEmailSession(email, password);
    } catch (error) {
      return await account.createEmailSession(email, password);
    }
  } catch (error: any) {
    console.log('error', error);
    toast.error('Login Error: ' + error?.message);
  }
}

export async function getUser() {
  try {
    const user = await account.get();
    if (user) {
      const list = await databases.listDocuments(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        [Query.equal('appwrite_id', user?.$id)],
      );
      return list?.documents[0] as AppwriteUser;
    }
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Getting User: ' + error?.message);
  }
  return null;
}

export async function logout() {
  try {
    destroyCookie(null, 'sessionId');
    localStorage?.removeItem('user');
    return await account.deleteSession('current');
  } catch (error: any) {
    console.log('error', error);
    toast.error('Logout Error: ' + error?.message);
  }
}

export async function forgotPassword(email: string) {
  try {
    return await account.createRecovery(email, `${BASE_URL}/reset-password`);
  } catch (error: any) {
    console.log('error', error);
    toast.error(
      error?.type === 'user_not_found' ? 'Email not found.' : error?.message,
    );
  }
}

export async function resetPassword({
                                      userId,
                                      secret,
                                      password,
                                      passwordConfirm,
                                    }: {
  userId: string;
  secret: string;
  password: string;
  passwordConfirm: string;
}) {
  try {
    return await account.updateRecovery(
      userId,
      secret,
      password,
      passwordConfirm,
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Reset Password Error: ' + error?.message);
  }
}

export async function changePassword({
                                       newPassword,
                                       oldPassword,
                                     }: ChangePasswordForm) {
  try {
    // Old password is required for all users created w email and password
    return await account.updatePassword(newPassword, oldPassword);
  } catch (error: any) {
    console.log('error', error);
    toast.error(
      error?.type === 'user_invalid_credentials'
        ? 'Current password is invalid.'
        : 'Error Changing Password: ' + error?.message,
    );
  }
}
