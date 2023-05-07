"use client";

import { MessageInput } from '@/components/message-input';
import { MessageList } from '@/components/message-list';
import { SocketContext } from '@/components/socket-context'
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const sock = io(process.env.NEXT_PUBLIC_SERVER_URL!);
    setSocket(sock);

    return () => {
      sock.disconnect();
      setSocket(null);
    }
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      <aside className="w-1/6 border-r bg-slate-900 hidden md:block">
        Some channels and/or servers
      </aside>
      <main className="flex-1 flex flex-col items-stretch justify-between p-4 overflow-auto">
        <MessageList />
        <MessageInput />
      </main>
    </SocketContext.Provider>
  )
}
