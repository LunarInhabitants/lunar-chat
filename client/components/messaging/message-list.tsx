"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "@/components/socket-context";
import { MessageEntry } from "./message-entry";
import type { ChannelMessageWithOwnerAndChannel } from "lunarchat-shared/src/lunarchat";
import { getMessagesInChannel } from "@/src/messages/messages";

interface Props {
    channelId: string;
}

export const MessageList = ({ channelId }: Props) => {
    const socket = useContext(SocketContext);
    const scrollerRef = useRef<HTMLDivElement>(null);
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
        if (channelId) {
            getMessagesInChannel(channelId).then(channelMessages => {
                setMessages(channelMessages);
            });
        }
    }, [channelId]);

    return (
        <div ref={scrollerRef} className="overflow-auto flex-1 p-4">
            {messages.map(m => (
                <MessageEntry key={m.id} message={m} />
            ))}
        </div>
    );
}