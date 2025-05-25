import { Client, neon } from "@neondatabase/serverless";
import { use } from "react";

const sql = neon(process.env.DATABASE_URL as string);

export type User = {
    id: number,
    name: string
}

export type LedgerItem = {
    id: number,
    giver_id: Number,
    reciever_id: Number
}

export type LedgerItemNames = {
  id: number,
  giver_id: number,
  reciever_id: number,
  giver_name: string,
  reciver_name: String
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

export async function getUserByName(name: string) {
  const resp = await sql.query("SELECT * FROM users WHERE name = $1", [name])
  const users = resp as User[]
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
    if (ledgerItems.length < 1) {
      const payer = participants[Math.floor(Math.random() * participants.length)]
      const atendees = await Promise.all(participants.map(u => getUserByName(u)))
      return {payer: payer, atendees: atendees}
    }
    console.log(users)

    let givers: { [key: string]: number} = {}
    let recievers: { [key: string]: number} = {}

    console.log("givers: ", givers)
    console.log("recievers: ", recievers)
    console.log("ledgerItems: ", ledgerItems)

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

    const payingUsername = (await getUserById(Number(payerId))).name

    // const participantsNoPayer = [...participants]
    // const indx = participantsNoPayer.indexOf(payingUsername)
    // if (indx > -1) {
    //   participantsNoPayer.splice(indx, 1);
    // }
    const atendees = await Promise.all(participants.map(u => getUserByName(u)))

    return {payer: (await getUserById(Number(payerId))).name, atendees: atendees}



}

export async function getUsersPaginated(page: number) {

    const users = await sql.query("SELECT * FROM users ORDER BY id LIMIT 10 OFFSET $1", [page]);
    const usersList = users as User[];
    const pageQuery = await sql.query("SELECT COUNT(*) FROM users")
    const totalPages = Math.ceil(Number(pageQuery[0].count)/10)

    return {usersList, totalPages}
}

export async function getLedgerItemWithNames(id: number) {
  const item = await sql.query("SELECT i.*, u1.name AS giver_name, u2.name AS reciever_name FROM ledger i LEFT JOIN users u1 ON i.giver_id = u1.id LEFT JOIN users u2 ON i.reciever_id = u2.id WHERE i.id = $1", [id])
  return item[0]
}


