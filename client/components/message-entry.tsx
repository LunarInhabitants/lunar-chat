"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "./socket-context";

export const MessageEntry = () => {
    const socket = useContext(SocketContext);
    const textarea = useRef<HTMLTextAreaElement>(null);
    const [username, setUsername] = useState(`user#${Math.floor(Math.random() * 1000)}`);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const u = localStorage.getItem("username");
        if(u) {
            setUsername(u);
        }
    }, []);

    const onSetUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        if(newUsername.length > 0) {
            localStorage.setItem("username", newUsername);
        }
    }

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

        console.log(`Sending ${message}`);
        setIsSending(true);

        const msg: IMessage = {
            id: new Date().getTime(),
            timestamp: new Date().getTime(),
            user: username,
            message
        };
        socket.emit("msg:send", msg, () => {
            setMessage("");
            setIsSending(false);
        })
    }

    return (
        <div className="min-h-fit flex items-center">
            <input type="text" value={username} onChange={e => onSetUsername(e)}
                className="text-gray-50 bg-gray-900 resize-none outline-none p-2 h-10 w-24 border-r"
            />
            <textarea ref={textarea} value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleInput} disabled={isSending}
                placeholder="Enter a message..."
                className="text-gray-50 bg-gray-900 resize-none outline-none p-2 h-10 flex-1"
            />
            <button type="button" onClick={sendMessage} disabled={isSending}
                className="text-gray-50 bg-gray-900 hover:bg-gray-800 h-full px-4"
            >
                Send
            </button>
        </div>
    )
}