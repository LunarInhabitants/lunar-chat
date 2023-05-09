"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/components/socket-context";
import { useSession } from "next-auth/react";

export const MessageInput = () => {
    const socket = useContext(SocketContext);
    const session = useSession();
    const textarea = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const username = session?.data?.user?.id ?? "";

    const handleInput = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if(message.length > 0) {
                sendMessage();
                setTimeout(() => {
                    textarea.current?.focus();
                }, 50);
            }
        }        
    }

    const sendMessage = () => {
        if(!socket) {
            alert("Not connected!");
            return;
        }

        setIsSending(true);

        const msg: LunarChatMessage = {
            id: new Date().getTime(),
            timestamp: new Date().getTime(),
            user: username,
            body: message
        };
        socket.emit("msg:send", msg, () => {
            setMessage("");
            setIsSending(false);
        })
    }

    return (
        <div className="h-12 sm:h-16 flex items-stretch">
            <textarea ref={textarea} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleInput} disabled={isSending}
                placeholder="Enter a message..."
                className="text-gray-50 bg-gray-900 resize-none outline-none px-4 py-2 flex-1"
            />
            <button type="button" onClick={sendMessage} disabled={isSending}
                className="text-gray-50 bg-gray-900 hover:bg-gray-800 px-4 hidden sm:block"
            >
                Send
            </button>
        </div>
    )
}