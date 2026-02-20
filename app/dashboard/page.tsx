import { createServerSupabase } from "../../lib/supabaseServer";
import { redirect } from "next/navigation";
import ClientDashboard, { Bookmark } from "./ClientDashboard";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: initialBookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookmarks:", error.message);
  }

  if (!user) redirect("/login");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
      {/* Ambient blobs (scaled for mobile) */}
      <div className="absolute top-[-20%] left-[-30%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-30%] w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-500 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-pink-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Smart Bookmarks
            </h1>
          </div>

          {/* Right side: email + logout */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <p className="text-sm text-white/40 break-all sm:break-normal max-w-[180px] sm:max-w-none">
              {user.email}
            </p>

            <div className="self-start sm:self-center">
              <LogoutButton />
            </div>
          </div>
        </div>

        <ClientDashboard initialBookmarks={initialBookmarks as Bookmark[]} />
      </div>
    </div>
  );
}
