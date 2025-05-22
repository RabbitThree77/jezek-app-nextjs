import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';


export async function checkAuth() {
    const cookie = await cookies();
    const auth = cookie.get("auth_token")?.value;

    if (auth != "hello") {
        redirect("/login")
    }
}