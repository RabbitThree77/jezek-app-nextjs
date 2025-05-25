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

    return (
        <LunchForm
            users={atendeeUsers}
            defaultPayer={payerId}
            atendees={atendeesNum}
        />
    );
}
