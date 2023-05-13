"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { ChannelMessageWithOwnerAndChannel, getMessagesInChannel } from "@/shared/db/messages";
import { userJoinedChannelsStore as userJoinedChannelsStore, selectedChannelIdStore } from "@/stores";
import { useStore } from "@nanostores/react";
import { MessageList } from "./message-list";
import { WebSocketContext } from "@/components/websocket";
import { MessageInput } from "./message-input";

export const MessageListContainer = () => {
    const socket = useContext(WebSocketContext);
    const selectedChannelId = useStore(selectedChannelIdStore);
    const channelsStore = useStore(userJoinedChannelsStore);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<ChannelMessageWithOwnerAndChannel[]>([]);

    const addNewMessage = useCallback((msg: ChannelMessageWithOwnerAndChannel) => {
        const newMessages = [...messages, msg];
        setMessages(newMessages);
        setTimeout(() => {
            if (scrollerRef.current) {
                scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
            }
        }, 50);
    }, [messages]);

    useEffect(() => {
        socket?.on("msg:receive", addNewMessage);

        return () => {
            socket?.off("msg:received", addNewMessage);
        }
    }, [socket, addNewMessage]);

    useEffect(() => {
        setLoading(true);

        if (selectedChannelId && selectedChannelId.length > 0) {
            getMessagesInChannel(selectedChannelId).then(channelMessages => {
                setMessages(channelMessages);
                setLoading(false);
                setTimeout(() => {
                    if (scrollerRef.current) {
                        scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
                    }
                }, 50);
            });
        }
    }, [selectedChannelId]);

    const selectedChannel = channelsStore[selectedChannelId];

    return (
        <div className="flex flex-col flex-1">
            <div className="flex items-center gap-4 px-4 py-2 bg-slate-800">
                <div className="font-bold min-w-[10%]">
                    {selectedChannel?.name ?? "<UNKNOWN CHANNEL>"}
                </div>
                <div className="flex-1 text-sm text-gray-400">
                    {selectedChannel?.description}
                </div>
            </div>
            <div ref={scrollerRef} className="flex-1 p-4 overflow-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        Loading...
                    </div>
                ) : (
                    <MessageList messages={messages} />
                )}
            </div>

            <MessageInput />
        </div>
    );
}