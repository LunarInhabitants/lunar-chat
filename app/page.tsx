"use client";

import { ChannelList } from '@/components/channels/channel-list';
import { MessageInput, MessageListContainer } from '@/components/messaging';
import { RealmList } from '@/components/realms/realm-list';
import { SocketContext } from '@/components/socket-context'
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const sock = io(process.env.NEXT_PUBLIC_LUNARCHAT_SERVER_URL!);
    setSocket(sock);

    return () => {
      sock.disconnect();
      setSocket(null);
    }
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      <aside className="w-1/6 border-r bg-slate-900 hidden md:flex flex-row ">
        <RealmList />
        <ChannelList />
      </aside>
      <main className="flex-1 flex flex-col items-stretch justify-between p-4 overflow-auto">
        <MessageListContainer />
        <MessageInput />
      </main>
    </SocketContext.Provider>
  )
}
