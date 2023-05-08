"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "@/components/socket-context";
import { MessageEntry } from "./message-entry";

export const MessageList = () => {
    const socket = useContext(SocketContext);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<LunarChatMessage[]>([]);

    const addNewMessage = useCallback((msg: LunarChatMessage) => {
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
        if (messages.length == 0) {
            setMessages([
                {
                    id: 0,
                    timestamp: Date.UTC(2069, 4, 20, 13, 37, 42),
                    user: "SYSTEM",
                    body: "*Messages support standard markdown and emoji using :shortcode:s (For example, \\:turtle\\: for :turtle:), with the addition that a single newline will actually have a newline, rather than needing two.*",
                },
                {
                    id: 1,
                    timestamp: Date.UTC(2069, 4, 20, 13, 37, 42),
                    user: "SYSTEM",
                    body: "*Note: Messages are **not** currently saved! If you refresh the page, they're gone!*",
                }
            ]);
        }
    }, [messages.length]);

    return (
        <div ref={scrollerRef} className="overflow-auto flex-1 p-4">
            {messages.map(m => (
                <MessageEntry key={m.id} message={m} />
            ))}
        </div>
    );
}