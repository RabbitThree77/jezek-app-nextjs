import { createInvoiceItem } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";
import { getAllUsers } from "@/app/lib/data";

export default async function Page() {
    await checkAuth();
    const users = await getAllUsers();
    return (
        <form action={createInvoiceItem}>
            <select name="giverId" id="giver">
                <option value="" disabled>
                    Select a giver
                </option>
                {users.map((user) => (
                    <option value={user.id.toString()} key={user.id.toString()}>
                        {user.name}
                    </option>
                ))}
            </select>
            <select name="recieverId" id="reciever">
                <option value="" disabled>
                    Select a reciever
                </option>
                {users.map((user) => (
                    <option value={user.id.toString()} key={user.id.toString()}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}
