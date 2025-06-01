"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getUserById, getUsersById } from "../lib/data";
import { ChevronDown, ChevronLeft } from "lucide-react";

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
        router.push(`${editRoute}/${id}`);
    };
    const deleteFunc = () => {
        deleteFunction(id);
    };

    const [payer, setPayer] = useState<string | null>(null);
    const [atendeesNames, setAtendeesnames] = useState<string[] | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();

    const expand = () => {
        if (!isExpanded && !payer) {
            startTransition(async () => {
                const user = await getUserById(payerId);
                const atendded = await getUsersById(atendees);
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
                        <ChevronLeft size={32} className="text-neutral-500" />
                    )}
                    {isExpanded && (
                        <ChevronDown size={32} className="text-neutral-500" />
                    )}
                </div>
            </div>
            {isPending && <h3>Loading...</h3>}
            {isExpanded && payer && (
                <div className="text-neutral-400">
                    <h3>Paid By: {payer}</h3>
                    <h3>Attended by:</h3>
                    {atendeesNames?.map((a) => (
                        <h3>{a}</h3>
                    ))}
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
        </div>
    );
};
