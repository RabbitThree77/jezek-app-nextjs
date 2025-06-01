'use server'

import { neon } from '@neondatabase/serverless';
import {number, string, z} from 'zod';
import { selectPayer } from './data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { title } from 'process';


const FormSchema = z.object({
    id: z.number(),
    name: z.string()
})

const InvoiceFormSchema = z.object({
    giver_id: z.coerce.number(),
    reciever_id: z.coerce.number()
})

const CreateLunchShema = z.object({
    payer_id: z.coerce.number(),
    atendees_ids: z.array(z.coerce.number()),
    title: z.string()
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
    const {payer, atendees} = await selectPayer(users as Array<string>)
    const params = new URLSearchParams
    params.append("payer", payer)
    for (let i of atendees) {
        params.append("atendees", i.id.toString())
    }
    console.log(payer)
    redirect(`/generate?${params.toString()}`)
}


export async function deleteUser(id: number) {
    await sql.query("DELETE FROM users WHERE id = $1", [id])
}

const EditUserSchema = z.object({
    name: z.string()
})

export async function editUser(id: number, formData: FormData) {
    const {name} = EditUserSchema.parse({
        name: formData.get("name")
    })
    await sql.query("UPDATE users SET name = $1 WHERE id= $2", [name, id])

    revalidatePath("/user")
    redirect("/user")
}

export async function createLunch(formData: FormData) {
    const {payer_id, atendees_ids, title} = CreateLunchShema.parse({
        payer_id: formData.get("payerId"),
        atendees_ids: formData.getAll("atendeesIds"),
        title: formData.get("title")
    })

    await sql.query("INSERT INTO lunches (payer_id, people_ids, title) VALUES ($1, $2, $3)", [payer_id, atendees_ids, title])
}

const exectutionSchema = z.object({
    payer_id: z.coerce.number(),
    title: z.string(),
    date: z.string()
})


/** pass the attendees with the one who is paying*/
export async function executeLunchCreate(atendees: number[], formdata: FormData) {
    let {payer_id, title, date} = exectutionSchema.parse({
        payer_id: formdata.get("payerId"),
        title: formdata.get("title"),
        date: formdata.get("date")
    })
    const atendeesNoPayer = [...atendees]
    const indx = atendeesNoPayer.indexOf(payer_id)
    if (indx > -1) {
      atendeesNoPayer.splice(indx, 1);
    }

    if (title == "") {
        title = "lunch"
    }

    const lunch_id = ((await sql.query("INSERT INTO lunches (payer_id, people_ids, title, date) VALUES ($1, $2, $3, $4) RETURNING id", [payer_id, atendees, title, date])) as unknown as [{id: number}])
    console.log("lunch_id: ", lunch_id)
    for (const id of atendees) {
        console.log(typeof id)
        console.log(typeof payer_id)
        if (id == payer_id) {
            console.log("we skipping it today bitch")
            continue
        }
        console.log(`the full list is: ${atendees}`)
        await sql.query("INSERT INTO ledger (giver_id, reciever_id, lunch_id) VALUES ($1, $2, $3)", [payer_id, id, lunch_id[0].id])
    }
    // redirect('/invoice/selection')
    redirect("/lunch")
}


export async function deleteLunch(id: number) {
    await sql.query("DELETE FROM lunches WHERE id= $1", [id])
}



export async function editLunch(id: number) {
    await deleteLunch(id)
    redirect("/invoice/selection")
}