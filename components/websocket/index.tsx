"use client";

import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const WebSocketContext = createContext<Socket | null>(null);

export const WebSocketProvider = ({ children } : PropsWithChildren) => {
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
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    )
}