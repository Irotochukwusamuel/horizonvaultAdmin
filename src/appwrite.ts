import { Account, Client, Databases, Storage } from 'appwrite';
import { APPWRITE_PROJECT_ID, APPWRITE_URL } from './lib/constants';

const client = new Client();

client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

