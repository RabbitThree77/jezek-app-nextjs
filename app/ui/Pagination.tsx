"use client";

import Link from "next/link";

export default function Pagination({
    page,
    totalPages,
}: {
    page: number;
    totalPages: number;
}) {
    console.log(page);
    console.log(totalPages);
    return (
        <div>
            {page > 1 ? (
                <Link href={`?page=${page - 1}`}>Back</Link>
            ) : (
                <Link
                    href={`?page=${page - 1}`}
                    className="pointer-events-none text-neutral-500"
                >
                    Back
                </Link>
            )}
            {page < totalPages ? (
                <Link href={`?page=${page + 1}`}>Next</Link>
            ) : (
                <Link
                    href={`?page=${page + 1}`}
                    className="pointer-events-none text-neutral-500"
                >
                    Next
                </Link>
            )}
        </div>
    );
}
