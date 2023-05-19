"use client";

import { useContext, useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { RealmWithChannelsAndUsers, selectedChannelIdStore, selectedRealmIdStore, userJoinedRealmsStore } from '@/stores';
import { useStore } from '@nanostores/react';
import { WebSocketContext } from "@/components/websocket";
import { ChannelGroupEntry } from './channel-group-entry';
import { getFirstChannelInRealm } from '@/shared';
import classNames from 'classnames';

export const ChannelList = () => {
    const socket = useContext(WebSocketContext);
    const userJoinedRealms = useStore(userJoinedRealmsStore);
    const selectedRealmId = useStore(selectedRealmIdStore);
    const [selectedRealm, setSelectedRealm] = useState<RealmWithChannelsAndUsers | null>(null);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const realm = userJoinedRealms[selectedRealmId];
        setSelectedRealm(realm ?? null);

        if (!realm) {
            return;
        }

        const selectedChannelId = selectedChannelIdStore.get();

        if (!realm.channelGroups.some(cg => cg.channels.some(c => c.id === selectedChannelId))) {
            // Need to select the first reasonable channel.
            const firstChannel = getFirstChannelInRealm(realm);

            if (firstChannel) {
                selectedChannelIdStore.set(firstChannel.id);
            } else {
                selectedChannelIdStore.set("");
            }
        }

        if (socket) {
            for (const cg of realm.channelGroups) {
                for (const c of cg.channels) {
                    socket.emit("channel:join", c.id);
                }
            }
        }
    }, [selectedRealmId, userJoinedRealms, socket]);

    let style = "absolute top-0 bottom-0 flex flex-col items-stretch w-3/4 border-r sm:w-1/4 md:w-1/5 lg:w-1/6 left-16 bg-slate-900 sm:static";

    return (
        <div className={classNames(`absolute top-9 flex flex-col items-stretch border-r border-b sm:border-b-0 sm:w-1/4 sm:h-auto md:w-1/5 lg:w-1/6 left-0 bg-slate-900 sm:static transition-[width]`,
            {
                "bottom-0 w-3/4": isMaximized,
                "w-8 h-6": !isMaximized
            }
        )}>
            <div className="flex items-center sm:hidden">
                <button type="button" onClick={_ => setIsMaximized(!isMaximized)} title={`${isMaximized ? "Hide" : "Show"} Channels`}
                    className="px-2.5 py-1"
                >
                    <FaBars />
                </button>
            </div>
            <div className={classNames(`sm:block`,
                {
                    "hidden": !isMaximized
                }
            )}>
                {selectedRealm?.channelGroups.map(g => <ChannelGroupEntry key={g.id} channelGroup={g} />)}
            </div>
        </div>
    );
}