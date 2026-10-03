import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/meetings" });
      }}
    >
      <button
        type="submit"
        className="rounded border border-white px-3 py-1 text-sm hover:bg-white hover:text-blue-700"
      >
        Sign Out
      </button>
    </form>
  );
}