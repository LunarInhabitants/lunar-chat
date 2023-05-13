import { getRealmsForUser } from '@/shared/db/realms';
import { Realm } from '@prisma/client';
import { atom,  map, onNotify } from 'nanostores';
import { userStore } from '.';

export const userJoinedRealmsStore = map<{ [key: string]: Realm | undefined }>({});
export const selectedRealmIdStore = atom<string>("");

// When the user store changes, reload the realm.
let lastUserId: string = "";
onNotify(userStore, async () => {
    const user = userStore.get();
    
    if(!user || user.id === lastUserId) {
        return;
    }

    lastUserId = user.id;

    const realms = await getRealmsForUser(user.id);
    for(const realm of realms) {
        userJoinedRealmsStore.setKey(realm.id, realm);
    }
});
