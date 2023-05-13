"use client";

import { createNewRealm } from "@/shared/db/realms";
import { updateUserJoinedRealmsStore, userStore } from "@/stores";
import { PropsWithChildren, useState } from "react"

export const NewRealmForm = () => {
    const [realmName, setRealmName] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(true);

    const doCreateNewRealm = async () => {
        const userId = userStore.get()?.id;
        if(!userId) {
            console.warn(`Could not create realm. Could not get a user ID!`);
            return;
        }

        const filteredRealmName = realmName.trim();
        await createNewRealm(userId, filteredRealmName, isPublic);
        await updateUserJoinedRealmsStore();
    }

    return (
        <div className="flex flex-col py-2">
            <FormRow>
                <label htmlFor="new-realm__name">Realm Name:</label>
                <input id="new-realm__name" type="text" value={realmName} onChange={e => setRealmName(e.target.value)}
                    className="w-1/2 px-2 text-black rounded form-input bg-slate-200"
                />
            </FormRow>

            <FormRow>
                <label htmlFor="new-realm__public" className="cursor-not-allowed">Public:</label>
                <input id="realm__public" type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} 
                    className="cursor-not-allowed" 
                />
            </FormRow>
            
            <button type="button" onClick={doCreateNewRealm} disabled={realmName.trim().length === 0}
                className="px-2 py-1 my-2 rounded-lg bg-cyan-700 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-300"
            >
                Create Realm!
            </button>
        </div>
    )
}

interface FormRowProps extends PropsWithChildren {
    className?: string;
}

const FormRow = ({ children, className }: FormRowProps) => {
    return (
        <div className={`flex items-center justify-center gap-2 mb-2 ${className ?? ""}`}>
            {children}
        </div>
    );
}