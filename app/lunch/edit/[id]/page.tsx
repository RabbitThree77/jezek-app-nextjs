import { editLunch } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";
import { getAllUsers, getLunchById, getUserById } from "@/app/lib/data";

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    await checkAuth();
    const id = (await params).id;
    const lunch = await getLunchById(id);
    const updateWithId = editLunch.bind(null, id);

    return (
        <div className="w-full h-screen flex justify-center items-center text-center">
            <form action={updateWithId}>
                <h1>
                    This will permanently delete the current lunch and send you
                    to remake it again. Are you sure?
                </h1>
                <p>Paid by {(await getUserById(lunch.payer_id)).name}</p>
                <p>Title: {lunch.title}</p>

                <button
                    type="submit"
                    className="pl-4 pr-4 pt-2 pb-2 bg-red-500 rounded"
                >
                    I know what I'm doing
                </button>
            </form>
        </div>
    );
}
