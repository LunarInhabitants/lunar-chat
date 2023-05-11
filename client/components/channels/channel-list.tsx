"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { RealmChannel, RealmChannelGroup } from '@prisma/client';
import { getChannelGroupsForRealm } from '@/src/channels';

interface Props {
    realmId: string;
}

type ChannelGroup = RealmChannelGroup & { channels: RealmChannel[]};

export const ChannelList = ({ realmId }: Props) => {
    const session = useSession();
    const [channelGroups, setChannelGroups] = useState<ChannelGroup[]>([]);
    const userId = session?.data?.user?.id;

    useEffect(() => {
        if (realmId) {
            getChannelGroupsForRealm(realmId).then(channelGroups => {
                setChannelGroups(channelGroups);
            });
        }
    }, [realmId]);

    return (
        <div className="px-2">
            {channelGroups.map(g => (
                <div key={g.id}>
                    <h3 className="italic font-bold">{g.name}</h3>
                    <ul className="px-2">
                        {g.channels.map(c => (
                            <li key={c.id}>{c.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}