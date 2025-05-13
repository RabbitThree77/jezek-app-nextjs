import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password")?.toString();
    const cookie = await cookies();
    if (password) {
      cookie.set("auth_token", password, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 2,
      });
    } else {
      throw new Error("Invalid password");
    }

    redirect("/");
  }

  return (
    <form action={login}>
      <label>
        Password:
        <input type="password" name="password" id="password" />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
