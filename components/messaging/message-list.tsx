"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "@/components/socket-context";
import { MessageEntry } from "./message-entry";
import { ChannelMessageWithOwnerAndChannel, getMessagesInChannel } from "@/src/messages";
import { selectedChannelIdStore } from "@/stores";
import { useStore } from "@nanostores/react";

interface Props {
    messages: ChannelMessageWithOwnerAndChannel[]
}

export const MessageList = ({ messages }: Props) => {
    if(!messages || messages.length == 0) {
        return (
            <div>No messages. Why don&apos;t you start the conversation?</div>
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