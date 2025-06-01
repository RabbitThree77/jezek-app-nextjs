import { getPayingPerson } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";
import { getAllUsers } from "@/app/lib/data";
// pages/_app.tsx or _app.js
import "@/app/globals.css";

export default async function Page() {
    await checkAuth();
    const users = await getAllUsers();
    return (
        <div className="flex w-full h-screen justify-center items-center text-center">
            <form action={getPayingPerson}>
                <select
                    name="users"
                    id="users"
                    multiple
                    className="w-80 custom-scrollbar"
                >
                    <option value="" disabled>
                        Select the atendees
                    </option>
                    {users.map((user) => (
                        <option
                            value={user.name.toString()}
                            key={user.id.toString()}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>
                <br />
                <button
                    type="submit"
                    className="pl-4 pr-4 pt-2 pb-2 bg-white text-black rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
