"use client";

import { useState, useTransition } from "react";
import { getLunchNamesNoDuplicates } from "../lib/data";
import { ChevronDown } from "lucide-react";

export const SelectionTextInput = ({ name }: { name: string }) => {
	const [lunchNames, setLunchNames] = useState<null | { title: string }[]>(
		null
	);
	const [isPending, startTransition] = useTransition();
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);

	const expand = async () => {
		if (!open && !lunchNames) {
			startTransition(async () => {
				const names = await getLunchNamesNoDuplicates();
				console.log(names);
				setLunchNames(names);
				setOpen(true);
			});
		} else {
			setOpen(!open);
		}
	};

	return (
		<div className="flex justify-center space-x-4 relative">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				className="border-1 border-neutral-600 rounded"
				name={name}
			/>
			<button type="button" className="max-w-5" onClick={expand}>
				<ChevronDown />
			</button>
			<div>
				{open && lunchNames && (
					<ul className=" absolute left-0 top-full mt-1 bg-neutral-800 p-2 rounded shadow">
						{lunchNames?.map((lunch) => (
							<li
								key={lunch.title}
								onClick={() => {
									setInputValue(lunch.title);
									setOpen(false);
								}}
								className="cursor-pointer border-b-1 border-neutral-500 pt-1 pb-1"
							>
								{lunch.title}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
