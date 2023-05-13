"use client";

import { KeyboardEvent, useContext, useRef, useState } from "react";
import { WebSocketContext } from "@/components/websocket";
import { useSession } from "next-auth/react";
import { ChannelMessageWithOwnerAndChannel } from "@/shared/db/messages";
import { useStore } from "@nanostores/react";
import { selectedChannelIdStore } from "@/stores";

export const MessageInput = () => {
    const socket = useContext(WebSocketContext);
    const session = useSession();
    const selectedChannelId = useStore(selectedChannelIdStore);
    const textarea = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

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

        const userId = session?.data?.user?.id;
        
        if(!userId) {
            alert("Not logged in!");
            return;
        }

        setIsSending(true);

        const msg: ChannelMessageWithOwnerAndChannel = {
            ownerId: userId,
            channelId: selectedChannelId,
            message: message,
        } as any;

        socket.emit("msg:send", msg, () => {
            setMessage("");
            setIsSending(false);
        })
    }

    return (
        <div className="flex items-stretch h-12 m-4 sm:h-16">
            <textarea ref={textarea} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleInput} disabled={isSending}
                placeholder="Enter a message..."
                className="flex-1 px-4 py-2 bg-gray-900 outline-none resize-none text-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed"
            />
            <button type="button" onClick={sendMessage} disabled={isSending}
                className="hidden px-4 bg-gray-900 text-gray-50 hover:bg-gray-800 sm:block"
            >
                Send
            </button>
        </div>
    )
}