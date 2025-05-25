import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#141414] text-white p-4 border-b-1 border-b-neutral-600">
      <ul>
        <li>
          <Link href="/user">Users Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
