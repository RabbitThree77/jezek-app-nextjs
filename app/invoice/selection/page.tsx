import { getPayingPerson } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";
import { getAllUsers } from "@/app/lib/data";

export default async function Page() {
    await checkAuth();
    const users = await getAllUsers();
    return (
        <form action={getPayingPerson}>
            <select name="users" id="users" multiple>
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
            <button type="submit">Submit</button>
        </form>
    );
}
