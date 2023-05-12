"use client";

import { PropsWithChildren, useState } from "react"

export const NewRealmForm = () => {
    const [realmName, setRealmName] = useState<string>("");

    const createNewRealm = () => {
        alert(`TODO: Create new realm with name ${realmName} and a subscription for the current user as admin to that realm.`);
    }

    return (
        <div className="flex flex-col py-2">
            <FormRow>
                <label htmlFor="new-realm-name">Realm Name:</label>
                <input id="new-realm-name" type="text" value={realmName} onChange={e => setRealmName(e.target.value)}
                    className="w-1/2 px-2 text-black rounded bg-slate-200"
                />
            </FormRow>

            <button type="button" onClick={createNewRealm}
                className="px-2 py-1 my-2 rounded-lg bg-cyan-700 hover:bg-cyan-600"
            >
                Create Realm!
            </button>
        </div>
    )
}

const FormRow = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex justify-center gap-2">
            {children}
        </div>
    );
}