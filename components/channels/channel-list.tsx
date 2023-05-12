"use client";

import { useContext, useEffect, useState } from 'react';
import type { RealmChannel, RealmChannelGroup } from '@prisma/client';
import { getChannelGroupsForRealm } from '@/src/channels';
import { selectedChannelIdStore, selectedRealmIdStore } from '@/stores';
import { useStore } from '@nanostores/react';
import { WebSocketContext } from "@/components/websocket";
import { ChannelGroupEntry } from './channel-group-entry';

type ChannelGroup = RealmChannelGroup & { channels: RealmChannel[]};

export const ChannelList = () => {
    const socket = useContext(WebSocketContext);
    const selectedRealmId = useStore(selectedRealmIdStore);
    const selectedChannelId = useStore(selectedChannelIdStore);
    const [channelGroups, setChannelGroups] = useState<ChannelGroup[]>([]);

    useEffect(() => {
        getChannelGroupsForRealm(selectedRealmId).then(channelGroups => {
            setChannelGroups(channelGroups);

            const firstChannelGroup = channelGroups.find(g => g.channels.length > 0);

            if(firstChannelGroup) {
                selectedChannelIdStore.set(firstChannelGroup.channels[0].id);
            } else {
                selectedChannelIdStore.set("");
            }

            if(socket) {
                for(const cg of channelGroups) {
                    for(const c of cg.channels) {
                        socket.emit("channel:join", c.id);
                    }
                }
            }
        });
    }, [selectedRealmId, socket]);

    return (
        <div className="flex flex-col items-stretch w-1/6 bg-slate-900">
            {channelGroups.map(g => <ChannelGroupEntry key={g.id} channelGroup={g} />)}
        </div>
    );
}