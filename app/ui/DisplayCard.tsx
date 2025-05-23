"use client";

import { useRouter } from "next/navigation";

export const DisplayCard = ({
    id,
    text,
    editRoute,
    deleteFunction,
}: {
    id: number;
    text: string;
    editRoute: string;
    deleteFunction: (id: number) => void;
}) => {
    const deleteFunctionId = deleteFunction.bind(null, id);

    const router = useRouter();

    const editFunc = () => {
        router.push(`${editRoute}/${id}`);
    };
    const deleteFunc = () => {
        deleteFunction(id);
    };

    return (
        <div className="flex items-center justify-between bg-neutral-800 rounded m-4 p-2 max-w-full overflow-hidden">
            <div className="text-lg font-medium text-white truncate max-w-[70%]">
                {text}
            </div>
            <div className="flex space-x-2">
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
    );
};
