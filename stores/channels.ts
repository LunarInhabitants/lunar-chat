import { RealmChannel } from '@prisma/client';
import { atom,  map } from 'nanostores';

export const selectedChannelIdStore = atom<string>("");
export const userJoinedChannelsStore = map<{ [key: string]: RealmChannel | undefined }>({});
