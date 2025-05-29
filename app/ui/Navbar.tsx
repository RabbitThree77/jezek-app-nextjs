import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full bg-[#141414] text-white p-4 border-b-1 border-b-neutral-600 min-h-15">
            <ul className="flex gap-4 items-center text-center">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/lunch">Lunch Management</Link>
                </li>
                <li>
                    <Link href="/user">Users Management</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
