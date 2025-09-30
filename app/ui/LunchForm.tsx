"use client";

import { useState } from "react";
import { User } from "../lib/data";
import { executeLunchCreate } from "../lib/actions";
import { SelectionTextInput } from "./SelectionTextInput";
import { TokenTable } from "./TokenTable";

export default function LunchForm({
	users,
	defaultPayer,
	atendees,
	time,
	table
}: {
	users: User[];
	defaultPayer: number;
	atendees: number[];
	time: string;
	table: { [id: string]: number }
}) {
	const bindSubmit = executeLunchCreate.bind(null, atendees);
	console.log(atendees);
	

	return (
		<div>
			
			<div className="w-full h-screen flex flex-col justify-center items-center text-center">
			<TokenTable table={table} />
			<br />
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
				<SelectionTextInput name="title" />
				<br />
				{/* <input
					id="title"
					type="text"
					name="title"
					defaultValue="lunch"
					className="border-1 border-neutral-600 rounded text-center"
				/>
				<br /> */}
				<label htmlFor="date">When was this lunch?</label>
				<br />
				<input
					type="date"
					id="date"
					name="date"
					defaultValue={time}
					className="border-1 border-neutral-600 rounded"
				/>
				<br />
				<button
					type="submit"
					className="pl-4 pr-4 pt-2 pb-2 bg-white text-black rounded"
				>
					Submit
				</button>
				<br />
			</form>
		</div>
		</div>
		
	);
}
