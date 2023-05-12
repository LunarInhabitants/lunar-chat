"use client";

import { useContext, useEffect, useState } from 'react';
import type { RealmChannel, RealmChannelGroup } from '@prisma/client';
import { getChannelGroupsForRealm } from '@/src/channels';
import { selectedChannelIdStore, selectedRealmIdStore } from '@/stores';
import { useStore } from '@nanostores/react';
import { WebSocketContext } from "@/components/websocket";
import { ChannelEntry } from './channel-entry';

interface Props {
    channelGroup: RealmChannelGroup & { channels: RealmChannel[] };
}

export const ChannelGroupEntry = ({ channelGroup }: Props) => {
    return (
        <details key={channelGroup.id} open>
            <summary className="px-2 py-1 italic font-bold cursor-pointer text-gray-400 hover:text-gray-200">
                {channelGroup.name}
            </summary>
            <div className="px-2 flex flex-col items-stretch">
                {channelGroup.channels.map(c => <ChannelEntry key={c.id} channel={c} />)}
            </div>
        </details>
    );
}