"use client";

import { getPublicRealmsForAddRealmPage, joinRealm, leaveRealm } from "@/shared/db/realms";
import { updateUserJoinedRealmsStore, userJoinedRealmsStore, currentUserStore } from "@/stores";
import { useStore } from "@nanostores/react";
import { Realm } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export const PublicRealmsList = () => {
    const [realms, setRealms] = useState<Realm[]>([]);

    const loadSomeRealms = useCallback(async () => {
        const moreRealms = await getPublicRealmsForAddRealmPage(realms.length);
        const filteredRealms = moreRealms.filter(r => !realms.some(r2 => r2.id === r.id)); // Only include new realms.
        setRealms([...realms, ...filteredRealms]); // And concat
    }, [realms]);

    useEffect(() => {
        loadSomeRealms();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-2 px-4 py-2 mx-4 my-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 rounded-xl bg-slate-600">
            {realms.map(realm => <RealmEntry key={realm.id} realm={realm} />)}
        </div>
    )
}

interface RealmEntryProps {
    realm: Realm;
}

const RealmEntry = ({ realm }: RealmEntryProps) => {
    const realmsStore = useStore(userJoinedRealmsStore);
    const alreadyJoined = realmsStore[realm.id];

    const doJoinRealm = async () => {
        const userId = currentUserStore.get()?.id;
        if(!userId) {
            console.warn(`Could not join realm. Could not get a user ID!`);
            return;
        }

        await joinRealm(userId, realm.id);
        await updateUserJoinedRealmsStore();
    }

    const doLeaveRealm = async () => {
        const userId = currentUserStore.get()?.id;
        if(!userId) {
            console.warn(`Could not leave realm. Could not get a user ID!`);
            return;
        }
        
        await leaveRealm(userId, realm.id);
        await updateUserJoinedRealmsStore(true);
    }

    return (
        <div className="flex gap-2 px-4 py-2 bg-slate-700">
            <div className="w-12">
                <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${realm.name}`} alt={realm.name} />
            </div>
            <div className="flex-1">
                <strong>{realm.name}</strong>
                <p className="text-sm text-gray-300">{realm.description}</p>
            </div>
            {alreadyJoined ? (
                <button type="button" onClick={doLeaveRealm}
                    className="px-4 rounded bg-rose-600 hover:bg-rose-500"
                >
                    Leave
                </button>
            ) : (
                <button type="button" onClick={doJoinRealm}
                    className="px-4 rounded bg-slate-500 hover:bg-slate-400"
                >
                    Join
                </button>)}

        </div>
    );
}
