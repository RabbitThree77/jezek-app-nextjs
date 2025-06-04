import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import 'server-only';


export const checkAuth = cache(async () => {
    const cookie = await cookies();
    const auth = cookie.get("auth_token")?.value;

    if (auth != "hello") {
        redirect("/login")
    }
})