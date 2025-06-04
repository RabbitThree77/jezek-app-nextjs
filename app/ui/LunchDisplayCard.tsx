"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
	fetchUserClientId,
	fetchUsersClientId,
	getUserById,
	getUsersById,
} from "../lib/data";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export const LunchDisplayCard = ({
	id,
	text,
	subtext,
	editRoute,
	deleteFunction,
	payerId,
	atendees,
}: {
	id: number;
	text: string;
	subtext: string;
	editRoute: string;
	deleteFunction: (id: number) => void;
	payerId: number;
	atendees: number[];
}) => {
	const deleteFunctionId = deleteFunction.bind(null, id);

	const router = useRouter();

	const editFunc = () => {
		setPopup(true);
		// router.push(`${editRoute}/${id}`);
	};
	const deleteFunc = () => {
		deleteFunction(id);
	};

	const [payer, setPayer] = useState<string | null>(null);
	const [atendeesNames, setAtendeesnames] = useState<string[] | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [popup, setPopup] = useState(false);

	const expand = () => {
		if (!isExpanded && !payer) {
			startTransition(async () => {
				const user = await fetchUserClientId(payerId);
				const atendded = await fetchUsersClientId(atendees);
				const humans = atendded.map((a) => a.name);

				setAtendeesnames(humans);
				setPayer(user.name);
				setIsExpanded(true);
			});
		} else {
			setIsExpanded((prev) => !prev);
		}
	};

	return (
		<div className="bg-neutral-800 rounded m-4 p-2 max-w-full">
			<div
				className="flex items-center justify-between  overflow-hidden"
				onClick={expand}
			>
				<div className="text-lg font-medium text-white truncate max-w-[70%]">
					<h2>{text}</h2>
					<h3 className="text-sm text-neutral-400">{subtext}</h3>
				</div>

				<div className="flex space-x-2">
					{!isExpanded && (
						<ChevronRight size={32} className="text-neutral-500" />
					)}
					{isExpanded && (
						<ChevronDown size={32} className="text-neutral-500" />
					)}
				</div>
			</div>
			{isPending && <h3>Loading...</h3>}
			{isExpanded && payer && (
				<div className="text-neutral-400">
					<h3>Attended by: {atendeesNames?.join(", ")}</h3>
					<h3>Paid By: {payer}</h3>

					<div className="space-x-2">
						<button
							onClick={editFunc}
							id="but1"
							className="border-1 bg-transparent border-white text-white p-2 rounded"
						>
							Edit
						</button>
						<button
							onClick={deleteFunc}
							id="but2"
							className="bg-white text-black p-2 rounded"
							type="button"
						>
							Delete
						</button>
					</div>
				</div>
			)}
			{popup && (
				<div className="relative z-10">
					<div className="fixed inset-0 transition-opacity">
						<div className="flex w-full h-full justify-center items-center">
							<div className="bg-neutral-800 border-2 border-red-500 rounded-xl text-center overflow-hidden max-w-[80%] p-5">
								<p>
									We will delete the object and you will have
									to remake it entirely, <br />
									Are you sure?
								</p>

								<div className="flex space-x-8 w-full justify-center mt-8">
									<button
										className="pl-4 pr-4 pt-2 pb-2 border-1 border-white rounded"
										onClick={() => {
											setPopup(false);
										}}
									>
										Back
									</button>
									<button
										className="pl-4 pr-4 pt-2 pb-2 bg-red-500 rounded"
										onClick={() => {
											router.push(`/invoice/selection`);
										}}
									>
										I understand
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
