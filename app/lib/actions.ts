'use server'

import { neon } from '@neondatabase/serverless';
import {z} from 'zod';
import { selectPayer } from './data';
import { redirect } from 'next/navigation';


const FormSchema = z.object({
    id: z.number(),
    name: z.string()
})

const InvoiceFormSchema = z.object({
    giver_id: z.coerce.number(),
    reciever_id: z.coerce.number()
})

const CreateUser = FormSchema.omit({id: true})

const sql = neon(process.env.DATABASE_URL as string);

export async function createUser(formData: FormData) {
    const {name} = CreateUser.parse({
        name: formData.get("name")
    })

    await sql`INSERT INTO users (name) VALUES (${name})`

}

export async function createInvoiceItem(formData: FormData) {
    const {giver_id, reciever_id} = InvoiceFormSchema.parse({
        giver_id: formData.get("giverId"),
        reciever_id: formData.get("recieverId")
    })

    await sql`INSERT INTO ledger (giver_id, reciever_id) VALUES (${giver_id}, ${reciever_id})`

}

export async function getPayingPerson(formData: FormData) {
    const users = formData.getAll("users")
    const payer = await selectPayer(users as Array<string>)
    console.log(payer)
    redirect(`/display/${payer}`)
}