import { createUser } from "@/app/lib/actions";

export default function Page() {
  return (
    <form action={createUser}>
      <label>
        Eneter a name for the person
        <input type="text" name="name" id="name" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
