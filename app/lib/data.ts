import { Client, neon } from "@neondatabase/serverless";
import { use } from "react";

const sql = neon(process.env.DATABASE_URL as string);

export type User = {
    id: number,
    name: string
}

export type LedgerItem = {
    giver_id: Number,
    reciever_id: Number
}

export async function getAllUsers(): Promise<Array<User>> {
    const resp = await sql.query("SELECT * FROM users");
    console.log(resp)
    return resp as User[]
}

function getMaxKeyRandomTiebreaker(obj: { [id: string]: number }): string | null {
  let max = -Infinity;
  let topKeys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value > max) {
      max = value;
      topKeys = [key];
    } else if (value === max) {
      topKeys.push(key);
    }
  }

  if (topKeys.length === 0) return null;

  // Randomly select one if there's a tie
  const randomIndex = Math.floor(Math.random() * topKeys.length);
  return topKeys[randomIndex];
}

export async function getUserById(id: number) {
    const resp = await sql.query("SELECT * FROM users WHERE id = $1", [id])
    console.log(id)
    const users = resp as User[]
    console.log(users)
    return users[0]
}


export async function selectPayer(participants: Array<string>) {

    const placeholder = participants.map((_, i) => `$${i + 1}`).join(',')

    let query = `SELECT * FROM users WHERE name IN (${placeholder})`
    const resp = await sql.query(query, participants)
    console.log(resp)
    const users = resp as Array<User>
    users.map((u) => {u.id})
    const userIds = users.map(item => item.id)

    const query2 = `select * from ledger where giver_id IN (${placeholder}) AND reciever_id IN (${placeholder})`

    const resp2 = await sql.query(query2, userIds) 
    const ledgerItems = resp2 as Array<LedgerItem>
    console.log(users)

    let givers: { [key: string]: number} = {}
    let recievers: { [key: string]: number} = {}

    for (let item of ledgerItems) {
        givers[item.giver_id.toString()] = (givers[item.giver_id.toString()] || 0) + 1;
        recievers[item.reciever_id.toString()] = (recievers[item.reciever_id.toString()] || 0) + 1;
    }

    const allIds = new Set([...Object.keys(recievers), ...Object.keys(givers)]);
    console.log(allIds)
    let result: { [id: string]: number } = {}

    for (const id of allIds) {
        const recieved = recievers[id] || 0
        const given = givers[id] || 0
        result[id] = recieved - given
    }

    const payerId = getMaxKeyRandomTiebreaker(result)
    console.log(result)
    console.log(`the id: ${payerId}`)

    
    

    return (await getUserById(Number(payerId))).name



}

export async function getUsersPaginated(page: number) {

    const users = await sql.query("SELECT * FROM users ORDER BY id LIMIT 10 OFFSET $1", [page]);
    const usersList = users as User[];
    const pageQuery = await sql.query("SELECT COUNT(*) FROM users")
    const totalPages = Math.ceil(Number(pageQuery[0].count)/10)

    return {usersList, totalPages}
}
