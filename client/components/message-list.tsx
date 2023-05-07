"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "./socket-context";
import ReactMarkdown from 'react-markdown'

export const MessageList = () => {
    const socket = useContext(SocketContext);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);

    const addNewMessage = useCallback((msg: IMessage) => {
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
            setMessages([{
                id: 0,
                timestamp: Date.UTC(2069, 4, 20, 13, 37, 42),
                user: "SYSTEM",
                message: "*Note: Messages are **not** currently saved! If you refresh the page, they're gone!*",
             }]);
        }
    }, []);

    return (
        <div ref={scrollerRef} className="overflow-auto flex-1 p-4">
            {messages.map(m => {
                const timestamp = new Date(m.timestamp);

                return (
                    <div key={m.id} className="grid grid-cols-[6rem,1fr] mt-2 text-gray-50 message-entry">
                        <div className="bg-gray-900 px-4 py-2 flex items-center">
                            {m.user}
                        </div>
                        <div className="bg-gray-800 px-4 pt-0 pb-2">
                            <time dateTime={timestamp.toISOString()} className="text-xs text-gray-400">
                                {timestamp.toLocaleString([], { dateStyle: "full", timeStyle: "medium" })}
                            </time>
                            <ReactMarkdown>{m.message}</ReactMarkdown>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}