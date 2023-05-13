import { atom } from 'nanostores';
import { User } from 'next-auth';

export const userStore = atom<User | null>(null);
