import { createUser } from "@/app/lib/actions";
import { checkAuth } from "@/app/lib/auth";

export default async function Page() {
    await checkAuth();
    return (
        <div className="w-full h-screen flex justify-center items-center text-center">
            <form action={createUser} className="space-y-4">
                <label htmlFor="name">What is the persons name?</label>
                <br />
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="border-1 border-neutral-600 rounded"
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
