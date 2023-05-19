"use client";

import { PageProps } from '@/.next/types/app/layout';
import { ChannelList } from '@/components/channels';
import { MessageListContainer } from '@/components/messaging';
import { selectedChannelIdStore, selectedRealmIdStore } from '@/stores';
import { useEffect } from 'react';

export default function Home({ params }: PageProps) {
  useEffect(() => {
    const selRealm = params.messagingRoute?.[0];
    if (selRealm && selectedRealmIdStore.get() !== selRealm) {
      selectedRealmIdStore.set(selRealm);
    }
  
    const selChannel = params.messagingRoute?.[1];
    if (selChannel && selectedChannelIdStore.get() !== selChannel) {
      selectedChannelIdStore.set(selChannel);
    }
  }, [params]);

  return (
    <>
      <ChannelList />
      <MessageListContainer />
    </>
  )
}
