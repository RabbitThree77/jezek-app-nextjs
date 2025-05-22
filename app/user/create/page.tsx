import { createUser } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";

export default async function Page() {
    await checkAuth();
    return (
        <form action={createUser}>
            <label>
                Eneter a name for the person
                <input type="text" name="name" id="name" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
