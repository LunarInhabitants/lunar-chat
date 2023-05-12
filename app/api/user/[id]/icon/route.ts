import { prisma } from "@/shared/db";
import { redirect } from 'next/navigation';

interface Context {
    params: {
        id: string;
    }
}

export const GET = async (request: Request, { params } : Context) => {
    const user = await prisma.user.findFirst({
        where: {
            id: params.id
        }
    });

    if(!user?.image) {
        let seed = user?.name ?? params.id;
        if(params.id === "SYSTEM") {
            seed = "lunar-chat";
        }

        return redirect(`https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}`)
    }

    return redirect(user.image);
}