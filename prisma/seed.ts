import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    const defaultOwner = await prisma.user.findFirst();

    if(!defaultOwner) {
        return;
    }

    const realm = await prisma.realm.upsert({
        where: {
            id: "_li_testrealm"
        },
        update: {},
        create: {
            id: "_li_testrealm",
            name: "Lunar Inhabitants",
            description: "A test server",
            ownerId: defaultOwner.id,
        },
    });

    const realmGroup = await prisma.realmUserGroup.upsert({
        where: {
            id: "_li_testrealm_defaultusergroup"
        },
        update: {},
        create: {
            id: "_li_testrealm_defaultusergroup",
            name: "Default",
            description: "",
        }
    });

    await prisma.userRealmSubscription.upsert({
        where: {
            realmId_userId: {
                userId: defaultOwner.id,
                realmId: realm.id,
            },           
        },
        update: {},
        create: {
            userId: defaultOwner.id,
            realmId: realm.id,
            groupId: realmGroup.id,
        }
    });

    const channelGroup = await prisma.realmChannelGroup.upsert({
        where: {
            id: "_li_testrealm_defaultchannelgroup"
        },
        update: {},
        create: {
            id: "_li_testrealm_defaultchannelgroup",
            realmId: realm.id,
            name: "Default Group",
            description: "All the default channels a server might have.",
        }
    });

    await prisma.realmChannel.upsert({
        where: {
            id: "_li_testrealm_defaultchannel1"
        },
        update: {},
        create: {
            id: "_li_testrealm_defaultchannel1",
            channelGroupId: channelGroup.id,
            name: "General",
            description: "General chat",
            displayOrder: 0,
        }
    });

    await prisma.realmChannel.upsert({
        where: {
            id: "_li_testrealm_defaultchannel2"
        },
        update: {},
        create: {
            id: "_li_testrealm_defaultchannel2",
            channelGroupId: channelGroup.id,
            name: "Memes",
            description: "Post memes and stuff",
            displayOrder: 1,
        }
    });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });