"use client";

import { currentUserStore } from "@/stores";
import { User } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      <SessionStoreProvider />
      {children}
    </SessionProvider>
  );
}

const SessionStoreProvider = ({ children }: PropsWithChildren) => {
  const session = useSession();
  
  useEffect(() => {
    currentUserStore.set(session.data?.user as User ?? null);
  }, [session]);

  return null;
}
