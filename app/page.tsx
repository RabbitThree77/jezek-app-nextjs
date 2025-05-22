import Image from "next/image";
import { getAllUsers } from "./lib/data";
import Link from "next/link";
import { checkAuth } from "./lib/auth";

export default async function Home() {
  await checkAuth();
  const users = getAllUsers();
  return (
    <div className="w-full p-5">
      <div className="flex space-x-4 p-2">
        <Link
          href="/user"
          className="bg-white pl-10 pr-10 pt-5 pb-5 rounded text-black hover:scale-110"
        >
          Manage Users
        </Link>
        <Link
          href="/invoice"
          className="bg-white pl-10 pr-10 pt-5 pb-5 rounded text-black hover:scale-110"
        >
          Manage the Ledger
        </Link>
      </div>
      <hr className="border-neutral-600" />
    </div>
  );
}
