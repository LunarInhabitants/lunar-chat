"use client";

import { KeyboardEvent, useContext, useRef, useState } from "react";
import { SocketContext } from "@/components/socket-context";
import { useSession } from "next-auth/react";
import type { ChannelMessageWithOwnerAndChannel } from "lunarchat-shared/src/lunarchat";

export const MessageInput = () => {
    const socket = useContext(SocketContext);
    const session = useSession();
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
            channelId: "_li_testrealm_defaultchannel1",
            message: message,
        } as any;

        socket.emit("msg:send", msg, () => {
            setMessage("");
            setIsSending(false);
        })
    }

    return (
        <div className="h-12 sm:h-16 flex items-stretch">
            <textarea ref={textarea} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleInput} disabled={isSending}
                placeholder="Enter a message..."
                className="text-gray-50 bg-gray-900 resize-none outline-none px-4 py-2 flex-1 disabled:text-gray-600 disabled:cursor-not-allowed"
            />
            <button type="button" onClick={sendMessage} disabled={isSending}
                className="text-gray-50 bg-gray-900 hover:bg-gray-800 px-4 hidden sm:block"
            >
                Send
            </button>
        </div>
    )
}