import { NewRealmForm } from "@/components/realms/new-realm-form";
import { PublicRealmsList } from "@/components/realms/public-realms-list";

export default function AddRealm() {
    return (
        <section className="flex-1">
            <header className="bg-slate-700">
                <h2 className="px-4 py-2 text-xl font-bold text-center">Add or join a Realm</h2>
            </header>

            <div className="grid grid-cols-1 px-4 py-2 mx-4 my-2 md:grid-cols-2 rounded-xl bg-slate-600">
                <div className="flex flex-col items-center justify-center gap-4 px-4 py-2 border-b md:border-r md:border-b-0">
                    <p>Here you can join any public Realm on this server!</p>
                    <p>Realms can focus on particular interests or hobbies, focus on a specific topic, or be a wild free-for-all. Why not have a look at the possibilites?</p>
                </div>
                <div className="flex flex-col items-center justify-center px-4 py-2">
                    <p>No realms appeal to you? Why not create your own!</p>
                    <NewRealmForm />
                </div>
            </div>

            <PublicRealmsList />
        </section>
    )
  }
  