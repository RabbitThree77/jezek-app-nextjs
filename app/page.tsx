import Image from "next/image";
import { getAllUsers } from "./lib/data";

export default function Home() {
  const users = getAllUsers();
  return <h1>Hello there</h1>;
}
