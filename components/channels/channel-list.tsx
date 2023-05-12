"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { RealmChannel, RealmChannelGroup } from '@prisma/client';
import { getChannelGroupsForRealm } from '@/src/channels';
import { selectedChannelIdStore, selectedRealmIdStore } from '@/stores';
import { useStore } from '@nanostores/react';

type ChannelGroup = RealmChannelGroup & { channels: RealmChannel[]};

export const ChannelList = () => {
    const session = useSession();
    const selectedRealmId = useStore(selectedRealmIdStore);
    const selectedChannelId = useStore(selectedChannelIdStore);
    const [channelGroups, setChannelGroups] = useState<ChannelGroup[]>([]);
    const userId = session?.data?.user?.id;

    useEffect(() => {
        getChannelGroupsForRealm(selectedRealmId).then(channelGroups => {
            setChannelGroups(channelGroups);

            const firstChannelGroup = channelGroups.find(g => g.channels.length > 0);

            if(firstChannelGroup) {
                selectedChannelIdStore.set(firstChannelGroup.channels[0].id);
            } else {
                selectedChannelIdStore.set("");
            }
        });
    }, [selectedRealmId]);

    return (
        <div className="px-2">
            {channelGroups.map(g => (
                <div key={g.id}>
                    <h3 className="italic font-bold">{g.name}</h3>
                    <div className="px-2 flex flex-col">
                        {g.channels.map(c => (
                            <label key={c.id} onClick={_ => selectedChannelIdStore.set(c.id)}>
                                <input type="radio" checked={c.id === selectedChannelId} onChange={_ => {}} />
                                {c.name}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}