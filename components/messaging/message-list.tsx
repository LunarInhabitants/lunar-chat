"use client"

import { MessageEntry } from "./message-entry";
import { ChannelMessageWithOwnerAndChannel } from "@/src/messages";

interface Props {
    messages: ChannelMessageWithOwnerAndChannel[]
}

export const MessageList = ({ messages }: Props) => {
    if(!messages || messages.length == 0) {
        return (
            <div className="flex items-center justify-center h-full">
                Huh, there are no messages in this channel. Why not start the conversation?
            </div>
        );
    }

    return (
        <>
            {messages.map(m => (
                <MessageEntry key={m.id} message={m} />
            ))}
        </>
    );
}