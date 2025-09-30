import { getUserById, getUserLunches } from "@/app/lib/data";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function UserDetailPage({ params }: PageProps) {
  const {id} = await params
  const user = await getUserById(Number(id));
  if (!user) return notFound();
  const lunches = await getUserLunches(Number(id))
  console.log(lunches)

  return <div>
	<h1>{lunches.map((lunch) => (
		<div>Name: {lunch.title}</div>
	))}</h1>
  </div>
}