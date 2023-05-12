import { Realm } from "@prisma/client"

interface Props {
    realm: Realm;
}

export const RealmEntry = ({ realm }: Props) => {
    return (
        <button type="button" key={realm.id} className="relative mt-2 group">
            <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${realm.name}`} alt={realm.name}
                className="w-12 rounded-[50%] group-hover:rounded-[25%] border-2 border-white transition-[border-radius]"
            />
            <div className={`absolute left-[125%] top-[15%] bottom-[15%] 
            opacity-0 -translate-x-4
            group-hover:opacity-100 group-hover:translate-x-0
            flex items-center text-center px-4 whitespace-nowrap pointer-events-none
            transition bg-gray-950 rounded-lg shadow-2xl shadow-black `}>
                {realm.name}
            </div>
        </button>
    );
}