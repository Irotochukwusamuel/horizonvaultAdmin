import { account, databases } from '@/appwrite';
import { toast } from 'react-toastify';
import { getUser } from './auth';
import { AppwriteUser, AppwriteUserPayment, User } from '@/types/user';
import { DATABASE_ID, USERS_COLLECTION_ID } from '@/lib/constants';
import { ID, Query } from 'appwrite';
import { generateRandomString } from '@/lib/utils';
import axios from 'axios';


export async function TestEmail() {
  try {
    await axios.post('/api/welcome-admin', {
      password: 'Siclair1119',
      to: 'samuel.iro@zerocomplex.ai',
      name: 'Blair John',
    });
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error  testing email: ' + error?.message);
  }
}

export async function updateName(name: string) {
  try {
    await account.updateName(name);
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Name: ' + error?.message);
  }
}

export async function updateEmail(email: string, password: string) {
  try {
    await account.updateEmail(email, password);
    return true;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Updating Name: ' + error?.message);
  }
}


export async function createAdmin(data: Partial<User>) {
  try {
    const name = `${data.first_name} ${data.last_name}`;
    const password = generateRandomString(12);
    const { $id } = await account.create(ID.unique(), data.email as string, password, name);

    const admin = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      $id,
      {
        'appwrite_id': $id,
        ...data,
      },
    );

    await axios.post('/api/welcome-admin', {
      password: password,
      to: data.email,
      name: `${name}`,
    });

    return admin as AppwriteUser;
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Creating Admin: ' + error?.message);
  }
}

export async function updateUser(data: Partial<User>) {
  const user = await getUser();
  if (user)
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        user.$id,
        data,
      );
    } catch (error: any) {
      console.log('error', error);
      toast.error('Error Updating User: ' + error?.message);
    }
}

//  todo: filter users with user_payments.length for paid and unpaid registrations
export async function getCustomerUsers() {
  try {
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [
        Query.notEqual('role', 'admin'),
        Query.equal('is_deleted', false),
        Query.limit(1000),
      ],
    );

    // todo: temp fix for users with null is_deleted attr. remove later
    const otherUsers = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [
        Query.notEqual('role', 'admin'),
        Query.isNull('is_deleted'),
        Query.limit(1000),
      ],
    );

    const customers = [...users?.documents, ...otherUsers?.documents];

    return customers as AppwriteUser[];
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

// todo: filter on is_deleted for active and disabled admins
export async function getAdminUsers() {
  try {
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('role', 'admin'), Query.limit(1000)],
    );

    return users?.documents as AppwriteUser[];
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.limit(1000), Query.notEqual('role', 'admin')],
    );

    return users?.documents as AppwriteUser[];
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function disableUser(documentId: string) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      documentId,
      { is_deleted: true },
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Disabling Admin: ' + error?.message);
  }
}

export async function enableUser(documentId: string) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      documentId,
      { is_deleted: false },
    );
  } catch (error: any) {
    console.log('error', error);
    toast.error('Error Enabling Admin: ' + error?.message);
  }
}

export async function getPayments() {
  try {
    const payments = await databases.listDocuments(
      DATABASE_ID,
      'user-payments',
      [
        Query.equal('is_deleted', false),
        Query.limit(1000),
        Query.orderDesc('$createdAt'),
      ],
    );


    return payments?.documents as AppwriteUserPayment[];
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function getUserById(documentId: string) {
  try {
    const user = await databases.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      documentId,
    );

    return user as AppwriteUser;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
