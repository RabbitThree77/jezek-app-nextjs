import { executeLunchCreate } from "../lib/actions";
import { getAllUsers, getUserByName, makeTable } from "../lib/data";
import LunchForm from "../ui/LunchForm";
import { TokenTable } from "../ui/TokenTable";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ payer: string; atendees: number[], names: string[] }>;
}) {
    const { payer, atendees, names } = await searchParams;
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

    const tData = await makeTable(names)

    return (
        <div>
            <LunchForm
            users={atendeeUsers}
            defaultPayer={payerId}
            atendees={atendeesNum}
            time={now}
            table={tData}
        />
            
        </div>
        
    );
}
