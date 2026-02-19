import { createServerSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const supabase = await createServerSupabase();

  // Just check if user is available – Supabase already set the session cookie
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("OAuth failed:", error?.message);
    redirect("/login");
  }

  redirect("/dashboard");

  return <p>Redirecting...</p>;
}
