"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "@/components/socket-context";
import { MessageEntry } from "./message-entry";
import { ChannelMessageWithOwnerAndChannel, getMessagesInChannel } from "@/src/messages";
import { selectedChannelIdStore } from "@/stores";
import { useStore } from "@nanostores/react";
import { MessageList } from "./message-list";


export const MessageListContainer = () => {
    const socket = useContext(SocketContext);
    const selectedChannelId = useStore(selectedChannelIdStore);
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

    return (
        <div ref={scrollerRef} className="overflow-auto flex-1 p-4">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <MessageList messages={messages} />
            )}
        </div>
    );
}