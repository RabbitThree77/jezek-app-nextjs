"use client";

import { redirect } from "next/navigation";

export default function AddButton({ route }: { route: string }) {
    return (
        <button
            onClick={() => redirect(route)}
            className="pt-2 pb-2 pl-4 pr-4 bg-white text-black rounded"
        >
            Add
        </button>
    );
}
