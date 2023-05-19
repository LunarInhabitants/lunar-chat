import { atom, map } from 'nanostores';
import { User } from 'next-auth';
import { getUserById as getUserByIdServer } from '@/shared/db/users';

export const currentUserStore = atom<User | null>(null);

/** 
 * A store containing details of all the users we care about. Ideally, don't depend on getting from this store, but do subscribe to it with useStore.
 * If you have a user ID and want to get it, call {@link getUserById} instead. This will update {@link allKnownUsersStore} when the user data is fetched.
 */
export const allKnownUsersStore = map<{ [key: string]: User | undefined }>({});

export async function getUserById(userId: string) {
    const store = allKnownUsersStore.get();
    const existing = store[userId];

    if (existing) {
        return existing;
    }

    const user = await getUserByIdServer(userId);

    if (user) {
        allKnownUsersStore.setKey(userId, user);
    }

    return user;
}
