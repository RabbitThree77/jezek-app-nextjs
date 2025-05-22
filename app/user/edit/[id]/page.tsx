import { editUser } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";
import { getUserById } from "@/app/lib/data";
import { todo } from "node:test";

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    await checkAuth();
    const id = (await params).id;
    const preData = await getUserById(id);
    const updateUserWithId = editUser.bind(null, id);

    return (
        <form action={updateUserWithId}>
            <input type="text" name="name" defaultValue={preData.name} />
            <button type="submit">Submit</button>
        </form>
    );
}
