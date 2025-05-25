import { createLunch } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";
import { getAllUsers } from "@/app/lib/data";

export default async function Page() {
    await checkAuth();
    const users = await getAllUsers();
    return (
        <form action={createLunch}>
            <select name="payerId" id="payer">
                <option value="" disabled>
                    Select who pays
                </option>
                {users.map((user) => (
                    <option value={user.id.toString()} key={user.id.toString()}>
                        {user.name}
                    </option>
                ))}
            </select>
            <select name="atendeesIds" id="atendees" multiple>
                <option value="" disabled>
                    Select who attended
                </option>
                {users.map((user) => (
                    <option value={user.id.toString()} key={user.id.toString()}>
                        {user.name}
                    </option>
                ))}
            </select>
            <input type="text" name="title" />
            <button type="submit">Submit</button>
        </form>
    );
}
