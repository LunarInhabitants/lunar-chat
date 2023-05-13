"use client";

import { userJoinedRealmsStore } from '@/stores';
import { AddRealmButton, RealmEntry } from './realm-entry';
import { useStore } from '@nanostores/react';

export const RealmList = () => {
    const realms = useStore(userJoinedRealmsStore);

    return (
        <div className="flex flex-col px-2 border-r bg-slate-950">
            {Object.keys(realms).map(realmID => {
                const realm = realms[realmID];
                return realm ? (
                    <RealmEntry key={realmID} realm={realm} />
                ) : (
                    null
                );
            })}
            <AddRealmButton />
        </div>
    );
}