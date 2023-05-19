import { getRealmsForUser } from '@/shared/db/realms';
import { atom,  map, onNotify } from 'nanostores';
import { allKnownUsersStore, currentUserStore } from '.';

type Unpacked<T> = T extends (infer U)[] ? U : T;
export type RealmWithChannelsAndUsers = Unpacked<Awaited<ReturnType<typeof getRealmsForUser>>>;

export const userJoinedRealmsStore = map<{ [key: string]: RealmWithChannelsAndUsers | undefined }>({});
export const selectedRealmIdStore = atom<string>("");

/**
 * Forces a refetch of the realm data and updates {@link userJoinedRealmsStore}.
 * @param forceRefetch If true, the {@link userJoinedRealmsStore}. is cleared completely before fetching. Set to true if a realm has been left or deleted.
 * @returns 
 */
export const updateUserJoinedRealmsStore = async (forceRefetch?: boolean) => {
    const user = currentUserStore.get();
    
    if(!user) {
        return;
    }

    const realms = await getRealmsForUser(user.id);

    if(forceRefetch) {
        userJoinedRealmsStore.set({});
    }

    const allUsers = allKnownUsersStore.get();
    const addedUserIds: { [key: string]: boolean } = {};

    for(const realm of realms) {
        userJoinedRealmsStore.setKey(realm.id, realm);

        for(const sub of realm.userRealmSubscriptions) {
            if(!allUsers[sub.user.id] && !addedUserIds[sub.user.id]) {
                allKnownUsersStore.setKey(sub.user.id, sub.user);
                addedUserIds[sub.user.id] = true;
            }
        }
    }
}

// When the user store changes, reload the realm.
onNotify(currentUserStore, () => updateUserJoinedRealmsStore());
