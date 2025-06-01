import { executeLunchCreate } from "../lib/actions";
import { getAllUsers, getUserByName } from "../lib/data";
import LunchForm from "../ui/LunchForm";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ payer: string; atendees: number[] }>;
}) {
    const { payer, atendees } = await searchParams;
    const atendeesNum = atendees.map(Number);
    const payerId = (await getUserByName(payer)).id;
    const users = await getAllUsers();
    const atendeeUsers = [];
    for (const u of users) {
        if (atendeesNum.includes(u.id)) {
            atendeeUsers.push(u);
        }
    }
    const bindExecuteLunch = executeLunchCreate.bind(null, atendees);

    const now = new Date().toISOString().split("T")[0];
    console.log("Now:");
    console.log(now);

    return (
        <LunchForm
            users={atendeeUsers}
            defaultPayer={payerId}
            atendees={atendeesNum}
            time={now}
        />
    );
}
