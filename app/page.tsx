"use client";

import { ChannelList } from '@/components/channels';
import { MessageListContainer } from '@/components/messaging';

export default function Home() {
  return (
    <>
      <ChannelList />
      <MessageListContainer />
    </>
  )
}
