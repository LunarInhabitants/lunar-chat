import { getRealmsForUser } from '@/shared/db/realms';
import { Realm } from '@prisma/client';
import { atom,  map, onNotify } from 'nanostores';
import { userStore } from '.';

export const userJoinedRealmsStore = map<{ [key: string]: Realm | undefined }>({});
export const selectedRealmIdStore = atom<string>("");

/**
 * Forces a refetch of the realm data and updates {@link userJoinedRealmsStore}.
 * @param forceRefetch If true, the {@link userJoinedRealmsStore}. is cleared completely before fetching. Set to true if a realm has been left or deleted.
 * @returns 
 */
export const updateUserJoinedRealmsStore = async (forceRefetch?: boolean) => {
    const user = userStore.get();
    
    if(!user) {
        return;
    }

    const realms = await getRealmsForUser(user.id);

    if(forceRefetch) {
        userJoinedRealmsStore.set({});
    }

    for(const realm of realms) {
        userJoinedRealmsStore.setKey(realm.id, realm);
    }
}

// When the user store changes, reload the realm.
onNotify(userStore, () => updateUserJoinedRealmsStore());
