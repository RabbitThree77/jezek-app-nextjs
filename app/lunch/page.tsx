import { redirect } from "next/navigation";
import { checkAuth } from "../lib/auth";
import { getLunchesPaginated, Lunch, toEuropeanDate } from "../lib/data";
import { DisplayCard } from "../ui/DisplayCard";

import { deleteLunch } from "../lib/actions";

import Pagination from "../ui/Pagination";
import AddButton from "../ui/AddButton";
import { LunchDisplayCard } from "../ui/LunchDisplayCard";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    await checkAuth();
    const params = await searchParams;
    const page = parseInt(params?.page || "", 10);
    if (isNaN(page) || page < 1) {
        redirect("/lunch?page=1");
    }

    const { lunchList, totalPages } = await getLunchesPaginated(page);

    return (
        <div className="m-4 pb-9">
            <div className="flex justify-center m-5">
                <h1 className="text-2xl mx-auto">Lunch Management</h1>
                <AddButton route="/invoice/selection" />
            </div>

            {lunchList.map((lunch: Lunch) => (
                <LunchDisplayCard
                    key={lunch.id}
                    id={lunch.id}
                    text={lunch.title}
                    editRoute="/lunch/edit"
                    deleteFunction={deleteLunch}
                    subtext={toEuropeanDate(lunch.date)}
                ></LunchDisplayCard>
            ))}
            <Pagination page={page} totalPages={totalPages}></Pagination>
        </div>
    );
}
