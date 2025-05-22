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
    <div className="flex h-screen text-center">
      <div className="m-auto">
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-2xl font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <button
              type="submit"
              className="black bg-white text-black pl-10 pr-10 pt-2 pb-2 rounded  hover:scale-110 border border-transparent"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
