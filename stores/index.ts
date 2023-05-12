import { Realm, RealmChannel } from '@prisma/client';
import { atom, map } from 'nanostores';

export const selectedRealmIdStore = atom<string>("");
export const selectedChannelIdStore = atom<string>("");

export const allRealmsStore = map<{ [key: string]: Realm | undefined }>({});
export const allChannelsStore = map<{ [key: string]: RealmChannel | undefined }>({});
