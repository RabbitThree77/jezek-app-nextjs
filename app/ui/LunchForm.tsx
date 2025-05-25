"use client";

import { useState } from "react";
import { User } from "../lib/data";
import { executeLunchCreate } from "../lib/actions";

export default function LunchForm({
    users,
    defaultPayer,
    atendees,
}: {
    users: User[];
    defaultPayer: number;
    atendees: number[];
}) {
    const bindSubmit = executeLunchCreate.bind(null, atendees);
    console.log(atendees);

    return (
        <form action={bindSubmit}>
            <select name="payerId" defaultValue={defaultPayer}>
                <option value="" disabled>
                    Select who Pays
                </option>
                {users.map((user) => (
                    <option
                        key={user.id}
                        value={user.id.toString()}
                        // selected={user.name === payer}
                    >
                        {user.name}
                    </option>
                ))}
            </select>
            <input type="text" name="title" defaultValue="lunch" />
            <button type="submit">Submit</button>
        </form>
    );
}
