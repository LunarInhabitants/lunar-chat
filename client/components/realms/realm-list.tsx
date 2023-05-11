"use client";

import { getRealmsForUser } from '@/src/realms';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { Realm } from '@prisma/client';
import { ChannelList } from '../channels/channel-list';

export const RealmList = () => {
    const session = useSession();
    const [realms, setRealms] = useState<Realm[]>([]);
    const userId = session?.data?.user?.id;

    useEffect(() => {
        if (userId) {
            getRealmsForUser(userId).then(r => {
                setRealms(r);
            });
        }
    }, [userId]);

    return (
        <div className="px-2">
            {realms.map(r => (
                <div key={r.id}>
                    <h2 className="text-xl font-bold">{r.name}</h2>
                    <ChannelList realmId={r.id} />
                </div>
            ))}
        </div>
    );
}