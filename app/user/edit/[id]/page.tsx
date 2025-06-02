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
        <div className="w-full h-screen flex justify-center items-center text-center">
            <form action={updateUserWithId} className="space-y-4">
                <label htmlFor="name">What should the name be?</label>
                <br />
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={preData.name}
                    className="border-1 border-neutral-600 rounded text-center"
                />
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
