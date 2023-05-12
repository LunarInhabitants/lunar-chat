"use client";

import { selectedRealmIdStore } from "@/stores";
import { useStore } from "@nanostores/react";
import { Realm } from "@prisma/client"
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props {
    realm: Realm;
}

export const RealmEntry = ({ realm }: Props) => {
    const router = useRouter();
    const selectedRealmId = useStore(selectedRealmIdStore);

    const onClick = () => {
        router.push("/");
        selectedRealmIdStore.set(realm.id);
    }

    return (
        <button type="button" className="relative mt-2 group" onClick={onClick}>
            <RealmEntryImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${realm.name}`} alt={realm.name} selected={selectedRealmId === realm.id} />
            <RealmEntryTooltip>
                {realm.name}
            </RealmEntryTooltip>
        </button>
    );
}

export const AddRealmButton = () => {
    const router = useRouter()

    return (
        <button type="button" className="relative mt-2 group" onClick={_ => router.push("/addrealm")}>
            <RealmEntryImage src={`https://api.dicebear.com/6.x/initials/svg?seed=%2B&backgroundColor=transparent`} alt="New Realm"
                className="hover:bg-gray-800"
            />
            <RealmEntryTooltip>
                Join or add a new Realm
            </RealmEntryTooltip>
        </button>
    );
}

interface RealmEntryImageProps {
    src: string;
    alt: string;
    selected?: boolean;
    className?: string;
}

const RealmEntryImage = ({ src, alt, className, selected }: RealmEntryImageProps) => {
    return (
        <img src={src} alt={alt}
            className={`w-12 rounded-[50%] group-hover:rounded-[25%] border-2 border-white transition-[border-radius,background-color] ${className ? className : ''}`}
        />
    );
}

const RealmEntryTooltip = ({ children }: PropsWithChildren) => {
    return (
        <div className={`absolute left-[125%] top-[15%] bottom-[15%] 
            opacity-0 -translate-x-4
            group-hover:opacity-100 group-hover:translate-x-0
            flex items-center text-center px-4 whitespace-nowrap pointer-events-none
            transition bg-gray-950 rounded-lg shadow-2xl shadow-black `}>
            {children}
        </div>
    );
}