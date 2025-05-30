import { redirect } from "next/navigation";
import { deleteUser } from "../lib/actions";
import { DisplayCard } from "../ui/DisplayCard";
import { User } from "@/app/lib/data";
import { getUsersPaginated } from "../lib/data";
import { checkAuth } from "../lib/auth";
import Pagination from "../ui/Pagination";
import AddButton from "../ui/AddButton";

type PageProps = {
    searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
    await checkAuth();
    const params = await searchParams;
    const page = parseInt(params?.page || "", 10);
    if (isNaN(page) || page < 1) redirect("/user?page=1");

    const testFunc = async (id: number) => {
        "use server";
        console.log("fuck yeah!");
    };

    const { usersList, totalPages } = await getUsersPaginated(page);

    return (
        <div className="m-4">
            <div className="flex justify-center m-5">
                <h1 className="text-2xl mx-auto">User Management</h1>
                <AddButton route="/user/create" />
            </div>
            {usersList.map((user: User) => (
                <DisplayCard
                    key={user.id}
                    id={user.id}
                    text={user.name}
                    editRoute="/user/edit"
                    deleteFunction={deleteUser}
                ></DisplayCard>
            ))}
            <Pagination page={page} totalPages={totalPages} />
        </div>
    );
}
