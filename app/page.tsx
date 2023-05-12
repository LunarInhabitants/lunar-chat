"use client";

import { ChannelList } from '@/components/channels/channel-list';
import { MessageInput, MessageListContainer } from '@/components/messaging';
import { RealmList } from '@/components/realms/realm-list';
import { WebSocketProvider } from '@/components/websocket';

export default function Home() {
  return (
    <WebSocketProvider>
      <main className="flex flex-row flex-1 overflow-hidden">
        <RealmList />
        <ChannelList />
        <MessageListContainer />
      </main>
    </WebSocketProvider>
  )
}
