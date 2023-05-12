import { NewRealmForm } from "@/components/realms/new-realm-form";

export default function Home() {
    return (
        <section className="flex-1">
            <header className="bg-slate-700">
                <h2 className="px-4 py-2 text-xl font-bold text-center">Add or join a Realm</h2>
            </header>

            <div className="grid grid-cols-1 px-4 py-2 mx-4 my-2 md:grid-cols-2 rounded-xl bg-slate-600">
                <div className="flex flex-col items-center justify-center px-4 py-2 border-b md:border-r md:border-b-0">
                    <p>Here you can join any public Realm on this server!</p>
                </div>
                <div className="flex flex-col items-center justify-center px-4 py-2">
                    <p>No realms appeal to you? Why not create your own!</p>
                    <NewRealmForm />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 px-4 py-2 mx-4 my-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 rounded-xl bg-slate-600">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(i => (
                    <div key={i} className="px-4 py-2 bg-slate-700">
                        <strong>Realm {i}</strong>
                        <p>Realm description here. Todo: Implement.</p>                     
                    </div>
                ))}
            </div>
        </section>
    )
  }
  