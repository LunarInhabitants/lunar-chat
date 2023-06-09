"use client";

import { useContext, useEffect, useState } from 'react';
import type { RealmChannel } from '@prisma/client';
import { userJoinedChannelsStore, selectedChannelIdStore, selectedRealmIdStore } from '@/stores';
import { useStore } from '@nanostores/react';
import { WebSocketContext } from "@/components/websocket";
import { routerPush } from '@/shared';

interface Props {
    channel: RealmChannel;
}

export const ChannelEntry = ({ channel }: Props) => {
    const socket = useContext(WebSocketContext);
    const selectedChannelId = useStore(selectedChannelIdStore);

    const isSelected = selectedChannelId === channel.id;

    useEffect(() => {
        if(channel && socket) {
            socket.emit("channel:join", channel.id);
            userJoinedChannelsStore.setKey(channel.id, channel);
        }

        // On component dismount
        return () => {
            if(channel && socket) {
                socket.emit("channel:leave", channel.id);
                const other = userJoinedChannelsStore.get()[channel.id];
                if(other === channel) {
                    userJoinedChannelsStore.setKey(channel.id, undefined);
                }
            }    
        }
    }, [channel, socket]);

    const setSelectedChannel = () => {
        selectedChannelIdStore.set(channel.id);
        // Below currently triggers a reload, which is glitchy and lame
        //router.push(`/${selectedRealmIdStore.get()}/${channel.id}`);
        // Falling back to native for now.
        routerPush(`/${selectedRealmIdStore.get()}/${channel.id}`);
    }

    return (
        <button type="button" onClick={setSelectedChannel}
            className={`text-start px-4 py-1 my-0.5 ${isSelected ? "font-bold text-gray-100 bg-white/20" : "font-normal text-gray-300 hover:bg-white/10"}`}
        >
            {channel.name}
        </button>
    );
}