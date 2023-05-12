"use client";

import { getRealmsForUser } from '@/src/realms';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { Realm } from '@prisma/client';
import { useStore } from '@nanostores/react';
import { selectedRealmIdStore } from '@/stores';

export const RealmList = () => {
    const session = useSession();
    const selectedRealmId = useStore(selectedRealmIdStore);
    const [realms, setRealms] = useState<Realm[]>([]);
    const userId = session?.data?.user?.id;

    useEffect(() => {
        if (userId) {
            getRealmsForUser(userId).then(userRealms => {
                setRealms(userRealms);
                
                if(userRealms.length > 0) {
                    // We get the ID from the store here instead of pulling from selectedRealmId to avoid a dependency array issue.
                    const selRealmId = selectedRealmIdStore.get(); 
                    const selectedRealm = userRealms.find(r => r.id === selRealmId);
                    if(!selectedRealm) {
                        selectedRealmIdStore.set(userRealms[0].id);
                    }
                }
            });
        }
    }, [userId]);

    return (
        <div className="px-2">
            {realms.map(r => (
                <div key={r.id}>
                    <h2 className="text-xl font-bold">{r.name}</h2>
                </div>
            ))}
        </div>
    );
}