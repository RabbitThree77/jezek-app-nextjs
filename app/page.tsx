import Image from "next/image";
import { getAllUsers, getCounts } from "./lib/data";
import Link from "next/link";
import { checkAuth } from "./lib/auth";

export default async function Home() {
	await checkAuth();
	const counts = await getCounts();
	return (
		<div className="w-full text-center p-5 flex flex-col md:flex-row justify-center space-y-5">
			<div className="w-full flex justify-center">
				<div className="border-1 border-neutral-700 rounded-2xl p-5 max-w-80 max-h-48 h-48">
					<h1 className="text-5xl">Lunches Eaten</h1>
					<h1 className="text-5xl">{counts.lunches}</h1>
				</div>
			</div>
			<div className="w-full flex justify-center">
				<div className="border-1 border-neutral-700 rounded-2xl p-5 max-w-80 max-h-48 h-48">
					<h1 className="text-5xl">Users Registered</h1>
					<h1 className="text-5xl">{counts.users}</h1>
				</div>
			</div>
		</div>
	);
}
