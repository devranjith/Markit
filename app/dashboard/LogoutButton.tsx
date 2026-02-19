"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="text-sm text-white/70 hover:text-white transition px-3 py-2 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 cursor-pointer"
    >
      Logout
    </button>
  );
}
