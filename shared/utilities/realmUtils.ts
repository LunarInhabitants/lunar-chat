import { RealmWithChannelsAndUsers } from "@/stores";

export function getFirstChannelInRealm(realm: RealmWithChannelsAndUsers) {
    let firstChannelGroup = realm.channelGroups.find(cg => cg.channels.length > 0);

    if(!firstChannelGroup) {
        // Realm has no channel groups, and therefore no channels
        return null;
    }

    for(const cg of realm.channelGroups) {
        if(cg.displayOrder < firstChannelGroup.displayOrder && cg.channels.length > 0) {
            firstChannelGroup = cg;
        }
    }

    let firstChannel = firstChannelGroup.channels[0];
    if(!firstChannel) {
        // Realm has groups but no channels
        return null;
    }

    for(const c of firstChannelGroup.channels) {
        if(c.displayOrder < firstChannel.displayOrder) {
            firstChannel = c;
        }
    }
    
    return firstChannel;
}