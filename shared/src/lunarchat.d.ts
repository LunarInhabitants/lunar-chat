import type { ChannelMessage, RealmChannel, User } from "@prisma/client";

type ChannelMessageWithOwnerAndChannel = ChannelMessage & {
    owner?: User | null;
    channel?: RealmChannel | null;
};
