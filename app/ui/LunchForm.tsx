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
        <div className="w-full h-screen flex justify-center items-center text-center">
            <form action={bindSubmit} className="space-y-4">
                <label htmlFor="payerId">Who will pay?</label>
                <br />
                <select
                    id="payerId"
                    name="payerId"
                    defaultValue={defaultPayer}
                    className="bg-neutral-900"
                >
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
                <br />
                <label htmlFor="">What do you want to call the lunch?</label>
                <br />
                <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue="lunch"
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
